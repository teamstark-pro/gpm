"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DynamicPageRenderer() {
    const params = useParams();
    const slug = params.slug as string;

    const [page, setPage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPage = async () => {
            try {
                // Fetch public page by slug
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/pages/slug/${slug}`);
                if (!res.ok) {
                    throw new Error("Page not found");
                }
                const data = await res.json();
                setPage(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) {
            fetchPage();
        }
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center pt-24 text-slate-500 animate-pulse">
                Loading page content...
            </div>
        );
    }

    if (error || !page) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center pt-24 text-center px-4">
                <h1 className="text-4xl font-serif font-bold text-slate-800 mb-4">404 - Page Not Found</h1>
                <p className="text-slate-600 mb-8 max-w-md">We couldn't find the page you were looking for. It may have been moved or deleted.</p>
                <Link href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-light transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen pt-24 bg-white">
            <title>{page.seo?.title || `${page.title} | GPM Educational Academy`}</title>
            {page.seo?.description && <meta name="description" content={page.seo.description} />}

            {/* The content rendered here assumes that the content string contains 
                some Tailwind classes or pre-formatted HTML structure since it's an advanced CMS.
                Using simple prose for safety. */}
            <article
                className="w-full prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-secondary-dark"
                dangerouslySetInnerHTML={{ __html: page.content }}
            />
        </div>
    );
}
