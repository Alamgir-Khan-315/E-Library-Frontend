import React, { useState } from "react";

export default function PdfOcrSummarizer() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [highlights, setHighlights] = useState([]);
    const [error, setError] = useState("");

    const OCR_API_KEY = "K81884301188957";

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError("");
        setSummary("");
        setHighlights([]);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("apikey", OCR_API_KEY);
        formData.append("language", "eng");
        formData.append("isOverlayRequired", "false");

        try {
            const res = await fetch("https://api.ocr.space/parse/image", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            const extractedText = data?.ParsedResults?.[0]?.ParsedText || "";
            setText(extractedText);

            // Call backend for summarization
            const summaryRes = await fetch("http://localhost:5000/api/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: extractedText }),
            });

            if (!summaryRes.ok) {
                const errorData = await summaryRes.json().catch(() => ({}));
                throw new Error(errorData.details || errorData.error || "Summarization failed on server.");
            }

            const summaryData = await summaryRes.json();
            setSummary(summaryData.summary);
            setHighlights(summaryData.highlights || []);

        } catch (err) {
            console.error(err);
            setError(err.message || "Processing failed");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">PDF OCR & Summary</h1>

            <div className="flex justify-between">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-4"
                />

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="px-4 py-2 bg-[#6366F1] hover:bg-[#6366F1]/80 text-white rounded-xl shadow"
                >
                    {loading ? "Processing..." : "Upload & Analyze"}
                </button>
            </div>

            {text && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Summary</h2>
                    <p className="bg-white p-4 rounded-xl shadow">{summary}</p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Key Highlights</h2>
                    <ul className="list-disc pl-5 bg-white p-4 rounded-xl shadow space-y-2">
                        {highlights.map((h, i) => (
                            <li key={i} className="text-gray-700">
                                {h}
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-2">Extracted Text</h2>
                    <pre className="bg-white p-4 rounded-xl shadow max-h-64 overflow-auto whitespace-pre-wrap">
                        {text}
                    </pre>
                </div>
            )
            }

            {
                error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl">
                        {error}
                    </div>
                )
            }
        </div >
    );
}
