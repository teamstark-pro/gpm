import FormRenderer from "@/components/ui/FormRenderer";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function GenericFormPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen flex flex-col pt-24 bg-slate-50">
            <Navbar />

            <main className="flex-grow max-w-4xl w-full mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 mb-12">
                    <FormRenderer templateId={params.id} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
