import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addIssue } from "../../lib/issues";
import { useAuth } from "../../contexts/AuthContext";

interface IssueFormData {
  image: File | null;
  name: string;
  description: string;
  tags: string[];
}

const IssueUploadForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<IssueFormData>({
    image: null,
    name: "",
    description: "",
    tags: [],
  });

  const [preview, setPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const generateTags = (desc: string) => {
    const keywords: Record<string, string[]> = {
      road: ["pothole", "crack", "road-damage"],
      garbage: ["waste", "trash", "sanitation"],
      light: ["streetlight", "electrical"],
      water: ["leakage", "pipe", "flooding"],
    };

    let found: string[] = [];
    Object.keys(keywords).forEach((key) => {
      if (desc.toLowerCase().includes(key)) {
        found = [...found, ...keywords[key]];
      }
    });

    setFormData((prev) => ({ ...prev, tags: Array.from(new Set(found)) }));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, description: value }));
    generateTags(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    
    if (!formData.name.trim() || !formData.description.trim()) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl: string | undefined = undefined;
      if (formData.image) {
        imageUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(formData.image!);
        });
      }

      const newIssue = addIssue({
        title: formData.name,
        description: formData.description,
        imageUrl: imageUrl,
        author: user?.username || "Anonymous",
        tags: formData.tags,
      });

      console.log("Issue created:", newIssue);

      window.dispatchEvent(new Event("issuesUpdated"));

      setFormData({
        image: null,
        name: "",
        description: "",
        tags: [],
      });
      setPreview("");
      
      navigate("/");
    } catch (error) {
      setSubmitError("Failed to submit issue. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-800/90 to-gray-800/50 shadow-2xl rounded-3xl border border-gray-700/50 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
          Report an Issue
        </h2>
        <p className="text-gray-400 text-sm">Help improve your community by reporting issues</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-3 text-gray-200">
            Upload Image
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full border-2 border-dashed border-gray-600 bg-gray-700/50 text-transparent p-4 rounded-xl hover:border-blue-500/50 focus:border-blue-500 focus:outline-none transition-colors duration-300 ease-out cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {!preview && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-gray-500 text-sm">Click to upload or drag and drop</span>
              </div>
            )}
          </div>
          {preview && (
            <div className="mt-4 rounded-xl overflow-hidden border-2 border-gray-700/50 bg-gray-900/50">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto max-h-64 object-contain"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-3 text-gray-200">Issue Title</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="block w-full border border-gray-600 bg-gray-700/50 text-gray-100 p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 ease-out"
            placeholder="Enter a descriptive title..."
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-3 text-gray-200">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={handleDescriptionChange}
            className="block w-full border border-gray-600 bg-gray-700/50 text-gray-100 p-3 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 ease-out resize-none"
            rows={4}
            placeholder="Describe the issue in detail..."
            required
          ></textarea>
        </div>

        {formData.tags.length > 0 && (
          <div>
            <label className="block font-semibold mb-3 text-gray-200">
              Generated Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {submitError && (
          <div className="p-4 bg-red-900/30 border-2 border-red-700/50 text-red-300 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-red-400">⚠</span>
              <span>{submitError}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Submitting...
            </span>
          ) : (
            "Submit Issue"
          )}
        </button>
      </form>
    </div>
  );
};

export default IssueUploadForm;
