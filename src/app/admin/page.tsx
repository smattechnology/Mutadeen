"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Type,
  Save,
  Eye,
  Link2,
  Unlink,
  X,
  ExternalLink,
} from "lucide-react";

/**
 * Interface for blog post data structure
 */
interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
}

/**
 * Props for the ToolButton component
 */
interface ToolButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
  className?: string;
}

/**
 * Props for the LinkModal component
 */
interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, text: string, openInNewTab: boolean) => void;
  initialUrl?: string;
  initialText?: string;
  isEditing?: boolean;
}

/**
 * Reusable toolbar button component with consistent styling
 */
const ToolButton: React.FC<ToolButtonProps> = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      p-2 rounded transition-colors duration-200 
      ${
        isActive
          ? "bg-blue-500 text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      ${className}
    `}
    type="button"
  >
    {children}
  </button>
);

/**
 * Modal component for link input with form validation
 */
const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialUrl = "",
  initialText = "",
  isEditing = false,
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [text, setText] = useState(initialText);
  const [openInNewTab, setOpenInNewTab] = useState(true);
  const [urlError, setUrlError] = useState("");
  const urlInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setUrl(initialUrl);
      setText(initialText);
      setUrlError("");
      // Focus URL input after modal opens
      setTimeout(() => urlInputRef.current?.focus(), 100);
    }
  }, [isOpen, initialUrl, initialText]);

  /**
   * Validates URL format
   */
  const validateUrl = (url: string): boolean => {
    if (!url.trim()) {
      setUrlError("URL is required");
      return false;
    }

    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const isValid =
      urlPattern.test(url) ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:");

    if (!isValid) {
      setUrlError("Please enter a valid URL");
      return false;
    }

    setUrlError("");
    return true;
  };

  /**
   * Handles form submission with validation
   */
  const handleSubmit = (e: React.FormEvent | React.MouseEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!validateUrl(url)) return;

    // Auto-add protocol if missing
    let finalUrl = url.trim();
    if (
      !finalUrl.startsWith("http") &&
      !finalUrl.startsWith("mailto:") &&
      !finalUrl.startsWith("tel:")
    ) {
      finalUrl = `https://${finalUrl}`;
    }

    onSubmit(finalUrl, text.trim(), openInNewTab);
    onClose();
  };

  /**
   * Handles URL input changes with real-time validation
   */
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    if (urlError && value.trim()) {
      validateUrl(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Modal Header */}
        {/* Modal Body */}
        {/* <div className="p-4 space-y-4">
          URL Input
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL *
            </label>
            <input
              ref={urlInputRef}
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com or mailto:email@example.com"
              className={`
                w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 
                ${
                  urlError
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300"
                }
              `}
              required
            />
            {urlError && (
              <p className="text-red-500 text-xs mt-1">{urlError}</p>
            )}
            </div>
        </div> */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditing ? "Edit Link" : "Add Link"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL *
            </label>
            <input
              ref={urlInputRef}
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://example.com or mailto:email@example.com"
              className={`
                w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 
                ${
                  urlError
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300"
                }
              `}
              required
            />
            {urlError && (
              <p className="text-red-500 text-xs mt-1">{urlError}</p>
            )}
          </div>

          {/* Link Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link Text (optional)
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Leave empty to use selected text"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Open in New Tab Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newTab"
              checked={openInNewTab}
              onChange={(e) => setOpenInNewTab(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="newTab" className="ml-2 text-sm text-gray-700">
              Open link in new tab
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Link2 className="h-4 w-4" />
              {isEditing ? "Update Link" : "Add Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main blog editor component with rich text editing capabilities
 */
const ProductionBlogEditor: React.FC = () => {
  // State for blog post data
  const [post, setPost] = useState<BlogPost>({
    title: "",
    content: "",
    excerpt: "",
    tags: "",
    category: "",
    metaTitle: "",
    metaDescription: "",
  });

  // UI state
  const [wordCount, setWordCount] = useState(0);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Initialize TipTap editor with extensions
   */
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-blue-600 underline hover:text-blue-800 transition-colors",
        },
      }),
    ],
    content: "<p>Start writing your blog post...</p>",
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setPost((prev) => ({ ...prev, content }));

      // Calculate word count from plain text
      const plainText = editor.state.doc.textContent;
      const words = plainText.split(/\s+/).filter((word) => word.length > 0);
      setWordCount(words.length);
    },
    onSelectionUpdate: () => {
      // Trigger re-render to update toolbar button states
      setPost((prev) => ({ ...prev }));
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[400px] p-4 focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  /**
   * Handles saving the blog post
   */
  const handleSave = useCallback(async () => {
    if (!post.title.trim()) {
      alert("Please add a title before saving.");
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Saving post:", {
        ...post,
        wordCount,
        contentLength: editor?.getText().length || 0,
      });

      alert("Post saved successfully!");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [post, wordCount, editor]);

  /**
   * Handles preview functionality
   */
  const handlePreview = useCallback(() => {
    if (!post.title.trim() || !post.content.trim()) {
      alert("Please add a title and content before previewing.");
      return;
    }

    console.log("Preview data:", post);
    alert("Opening preview...");

    // In a real app, this would open a preview modal or new window
  }, [post]);

  /**
   * Handles link addition/editing
   */
  const handleLinkSubmit = useCallback(
    (url: string, text: string, openInNewTab: boolean) => {
      if (!editor) return;

      const attributes = {
        href: url,
        ...(openInNewTab && { target: "_blank", rel: "noopener noreferrer" }),
      };

      const selection = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(
        selection.from,
        selection.to
      );

      if (selectedText) {
        // Update existing selection
        editor.chain().focus().setLink(attributes).run();
      } else if (text) {
        // Insert new link with custom text
        editor
          .chain()
          .focus()
          .insertContent(
            `<a href="${url}" ${
              openInNewTab ? 'target="_blank" rel="noopener noreferrer"' : ""
            }>${text}</a>`
          )
          .run();
      } else {
        // Insert URL as both link and text
        editor
          .chain()
          .focus()
          .insertContent(
            `<a href="${url}" ${
              openInNewTab ? 'target="_blank" rel="noopener noreferrer"' : ""
            }>${url}</a>`
          )
          .run();
      }
    },
    [editor]
  );

  /**
   * Opens link modal for adding links
   */
  const handleAddLink = useCallback(() => {
    if (!editor) return;
    setIsLinkModalOpen(true);
  }, [editor]);

  /**
   * Removes link from current selection
   */
  const handleRemoveLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  /**
   * Updates post field values
   */
  const updatePostField = useCallback(
    (field: keyof BlogPost, value: string) => {
      setPost((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Show loading state if editor isn't ready
  if (!editor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  const hasLinkActive = editor.isActive("link");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="bg-white rounded-lg shadow-sm mb-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Create Blog Post
            </h1>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePreview}
                disabled={!post.title.trim() || !post.content.trim()}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                type="button"
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !post.title.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                type="button"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Post"}
              </button>
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="Enter your blog title..."
            value={post.title}
            onChange={(e) => updatePostField("title", e.target.value)}
            className="w-full text-3xl font-bold placeholder-gray-300 border-none outline-none mb-4 focus:ring-0"
            maxLength={100}
            aria-label="Blog post title"
          />

          {/* Basic Meta Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={post.category}
                onChange={(e) => updatePostField("category", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Post category"
              >
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="tag1, tag2, tag3"
                value={post.tags}
                onChange={(e) => updatePostField("tags", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={200}
                aria-label="Post tags"
              />
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Section */}
          <main className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Enhanced Toolbar */}
              <div className="border-b border-gray-200 p-3 bg-gray-50">
                <div className="flex gap-1 items-center flex-wrap">
                  {/* Text Formatting Group */}
                  <div className="flex gap-1">
                    <ToolButton
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      isActive={editor.isActive("bold")}
                      title="Bold (Ctrl+B)"
                    >
                      <Bold className="h-4 w-4" />
                    </ToolButton>
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                      isActive={editor.isActive("italic")}
                      title="Italic (Ctrl+I)"
                    >
                      <Italic className="h-4 w-4" />
                    </ToolButton>
                  </div>

                  <div
                    className="w-px h-6 bg-gray-300 mx-2"
                    aria-hidden="true"
                  ></div>

                  {/* Headings Group */}
                  <div className="flex gap-1">
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                      }
                      isActive={editor.isActive("heading", { level: 1 })}
                      title="Heading 1"
                    >
                      H1
                    </ToolButton>
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                      }
                      isActive={editor.isActive("heading", { level: 2 })}
                      title="Heading 2"
                    >
                      H2
                    </ToolButton>
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                      }
                      isActive={editor.isActive("heading", { level: 3 })}
                      title="Heading 3"
                    >
                      H3
                    </ToolButton>
                  </div>

                  <div
                    className="w-px h-6 bg-gray-300 mx-2"
                    aria-hidden="true"
                  ></div>

                  {/* Lists and Quote Group */}
                  <div className="flex gap-1">
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                      isActive={editor.isActive("bulletList")}
                      title="Bullet List"
                    >
                      <List className="h-4 w-4" />
                    </ToolButton>
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                      isActive={editor.isActive("orderedList")}
                      title="Numbered List"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </ToolButton>
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                      }
                      isActive={editor.isActive("blockquote")}
                      title="Quote"
                    >
                      <Quote className="h-4 w-4" />
                    </ToolButton>
                  </div>

                  <div
                    className="w-px h-6 bg-gray-300 mx-2"
                    aria-hidden="true"
                  ></div>

                  {/* Link Group */}
                  <div className="flex gap-1">
                    <ToolButton
                      onClick={handleAddLink}
                      isActive={hasLinkActive}
                      title="Add Link (Ctrl+K)"
                    >
                      <Link2 className="h-4 w-4" />
                    </ToolButton>
                    <ToolButton
                      onClick={handleRemoveLink}
                      disabled={!hasLinkActive}
                      title="Remove Link"
                    >
                      <Unlink className="h-4 w-4" />
                    </ToolButton>
                  </div>

                  <div
                    className="w-px h-6 bg-gray-300 mx-2"
                    aria-hidden="true"
                  ></div>

                  {/* Alignment Group */}
                  <div className="flex gap-1">
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                      }
                      isActive={editor.isActive({ textAlign: "left" })}
                      title="Align Left"
                    >
                      <AlignLeft className="h-4 w-4" />
                    </ToolButton>
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                      }
                      isActive={editor.isActive({ textAlign: "center" })}
                      title="Align Center"
                    >
                      <AlignCenter className="h-4 w-4" />
                    </ToolButton>
                    <ToolButton
                      onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                      }
                      isActive={editor.isActive({ textAlign: "right" })}
                      title="Align Right"
                    >
                      <AlignRight className="h-4 w-4" />
                    </ToolButton>
                  </div>

                  <div
                    className="w-px h-6 bg-gray-300 mx-2"
                    aria-hidden="true"
                  ></div>

                  {/* History Group */}
                  <div className="flex gap-1">
                    <ToolButton
                      onClick={() => editor.chain().focus().undo().run()}
                      disabled={!editor.can().undo()}
                      title="Undo (Ctrl+Z)"
                    >
                      <Undo className="h-4 w-4" />
                    </ToolButton>
                    <ToolButton
                      onClick={() => editor.chain().focus().redo().run()}
                      disabled={!editor.can().redo()}
                      title="Redo (Ctrl+Y)"
                    >
                      <Redo className="h-4 w-4" />
                    </ToolButton>
                  </div>
                </div>
              </div>

              {/* Editor Content */}
              <div
                className="min-h-[500px] bg-white"
                role="textbox"
                aria-label="Blog post content editor"
              >
                <EditorContent editor={editor} />
              </div>

              {/* Editor Footer with Stats */}
              <div className="border-t border-gray-200 px-4 py-2 bg-gray-50 text-sm text-gray-600 flex justify-between">
                <div>
                  Words: <span className="font-medium">{wordCount}</span> |
                  Characters:{" "}
                  <span className="font-medium">{editor.getText().length}</span>
                </div>
                {hasLinkActive && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <ExternalLink className="h-3 w-3" />
                    <span>Link selected</span>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Excerpt Section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Excerpt</h3>
              <textarea
                placeholder="Brief summary of your post..."
                value={post.excerpt}
                onChange={(e) => updatePostField("excerpt", e.target.value)}
                rows={3}
                maxLength={160}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                aria-label="Post excerpt"
              />
              <p className="text-xs text-gray-500 mt-1">
                {post.excerpt.length}/160 chars
              </p>
            </div>

            {/* SEO Settings Section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-3">SEO Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    placeholder="SEO optimized title"
                    value={post.metaTitle}
                    onChange={(e) =>
                      updatePostField("metaTitle", e.target.value)
                    }
                    maxLength={60}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="SEO title"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {post.metaTitle.length}/60 chars
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    placeholder="Description for search engines"
                    value={post.metaDescription}
                    onChange={(e) =>
                      updatePostField("metaDescription", e.target.value)
                    }
                    rows={3}
                    maxLength={160}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    aria-label="Meta description"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {post.metaDescription.length}/160 chars
                  </p>
                </div>
              </div>
            </div>

            {/* Writing Tips Section */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Type className="h-4 w-4" />
                Writing Tips
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use headings to structure content</li>
                <li>• Keep paragraphs short and readable</li>
                <li>• Write compelling meta descriptions</li>
                <li>• Use relevant keywords naturally</li>
                <li>• Add internal and external links</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Link Modal */}
        <LinkModal
          isOpen={isLinkModalOpen}
          onClose={() => setIsLinkModalOpen(false)}
          onSubmit={handleLinkSubmit}
        />
      </div>
    </div>
  );
};

export default ProductionBlogEditor;
