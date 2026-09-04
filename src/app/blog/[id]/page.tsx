import type { Metadata } from "next";
import { posts as STATIC_POSTS, BlogPost } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";
import { notFound } from "next/navigation";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 300; // ISR revalidate every 5 minutes

async function getPostData(id: string): Promise<{ post: BlogPost | null; relatedPosts: BlogPost[] }> {
  if (!isSupabaseConfigured()) {
    const post = STATIC_POSTS.find((p) => p.id === id || p.slug === id);
    if (!post) return { post: null, relatedPosts: [] };
    const relatedPosts = STATIC_POSTS.filter((p) => p.id !== post.id).slice(0, 3);
    return { post, relatedPosts };
  }

  try {
    const supabase = getServerSupabase()!;
    // Check if ID is UUID or slug
    const column = id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i) ? "id" : "slug";
    
    const { data: dbPost } = await supabase
      .from("website_blogs")
      .select("*")
      .eq(column, id)
      .single();

    if (!dbPost) return { post: null, relatedPosts: [] };

    const post: BlogPost = {
      id: dbPost.id,
      slug: dbPost.slug,
      title: dbPost.title,
      excerpt: dbPost.excerpt,
      content: dbPost.content,
      image: dbPost.image,
      category: dbPost.category,
      author: dbPost.author,
      authorRole: dbPost.author_role,
      tags: dbPost.tags ?? [],
      readTime: dbPost.read_time,
      accent: dbPost.accent,
      date: dbPost.published_at ? new Date(dbPost.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently",
    };

    // Get 3 related posts
    const { data: dbRelated } = await supabase
      .from("website_blogs")
      .select("*")
      .eq("status", "published")
      .neq("id", dbPost.id)
      .limit(3);

    const relatedPosts: BlogPost[] = (dbRelated ?? []).map((row) => ({
      id: row.slug || row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      image: row.image,
      category: row.category,
      author: row.author,
      authorRole: row.author_role,
      tags: row.tags ?? [],
      readTime: row.read_time,
      accent: row.accent,
      date: row.published_at ? new Date(row.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently",
    }));

    return { post, relatedPosts };
  } catch (err) {
    console.error("Error loading blog details from database:", err);
    // Fallback to static posts
    const post = STATIC_POSTS.find((p) => p.id === id || p.slug === id);
    if (!post) return { post: null, relatedPosts: [] };
    const relatedPosts = STATIC_POSTS.filter((p) => p.id !== post.id).slice(0, 3);
    return { post, relatedPosts };
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { post } = await getPostData(id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | eVeda Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  if (!isSupabaseConfigured()) {
    return STATIC_POSTS.map((post) => ({
      id: post.slug || post.id,
    }));
  }

  try {
    const supabase = getServerSupabase()!;
    const { data } = await supabase.from("website_blogs").select("id, slug").eq("status", "published");
    return (data ?? []).map((p) => ({
      id: p.slug || p.id,
    }));
  } catch {
    return STATIC_POSTS.map((post) => ({
      id: post.slug || post.id,
    }));
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const { post, relatedPosts } = await getPostData(id);
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
