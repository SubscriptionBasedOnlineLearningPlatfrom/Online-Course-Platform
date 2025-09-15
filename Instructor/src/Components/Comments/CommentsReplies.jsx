import { APIContext } from "@/Contexts/APIContext";
import React, { useState, useEffect, useContext, use } from "react";
import axios from "axios";
import { set } from "zod";

const CommentsReplies = () => {
  const {BackendAPI} = useContext(APIContext);

  // const [comments] = useState([
  //   { id: 1, username: "Alice Johnson", course_title: "React for Beginners", comment: "Really helpful course_title! Loved the explanations.", date: "2025-07-15" },
  //   { id: 2, username: "Mark Lee", course_title: "Node.js Mastery", comment: "Good content but could use more real-world examples.", date: "2025-07-12" },
  //   { id: 3, username: "Sophia Davis", course_title: "AI with Python", comment: "Found some sections difficult to follow.", date: "2025-07-10" },
  // ]);

  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [activeReply, setActiveReply] = useState(null); // which comment is showing the textarea
  const [replies, setReplies] = useState([]);           // { [commentId]: ["reply1", "reply2"] }
  const [drafts, setDrafts] = useState({});             // { [commentId]: "current typing text" }
  const [editing, setEditing] = useState(null);         // { id, idx } or null
  const [editDraft, setEditDraft] = useState("");

  // Load replies from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchReplies = async () => {
      try {
        const response = await axios.get(`${BackendAPI}/comments/comments`, {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        });

        if(response.status === 200) {
          setComments(Object.values(response.data));
          setReplies(Object.values(response.data));
          console.log(Object.values(response.data));
          console.log(comments);
        }
      } catch (error) {
        console.error("Failed to fetch replies:", error);
      }
    }
    fetchReplies();
  },[BackendAPI]
  )

  // Persist replies when they actually change (submit/edit/delete)
  useEffect(() => {
    localStorage.setItem("replies", JSON.stringify(replies));
  }, [replies]);

  const handleReplySubmit = (id) => {
    const text = (drafts[id] || "").trim();
    if (!text) return;
    const updated = { ...replies, [id]: [...(replies[id] || []), text] };
    setReplies(updated);
    // clear draft & close
    setDrafts((d) => ({ ...d, [id]: "" }));
    setActiveReply(null);
  };

  const handleStartEdit = (id, idx) => {
    setEditing({ id, idx });
    setEditDraft(replies[id][idx]);
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    const { id, idx } = editing;
    const text = editDraft.trim();
    if (!text) return;
    const updated = { ...replies };
    updated[id] = [...updated[id]];
    updated[id][idx] = text;
    setReplies(updated);
    setEditing(null);
    setEditDraft("");
  };

  const handleDelete = (id, idx) => {
    const updated = { ...replies };
    updated[id] = (updated[id] || []).filter((_, i) => i !== idx);
    if (updated[id].length === 0) delete updated[id];
    setReplies(updated);
    // also close editors if they were open on this reply
    if (editing && editing.id === id && editing.idx === idx) {
      setEditing(null);
      setEditDraft("");
    }
    if (activeReply === id) setActiveReply(null);
  };

  const filteredComments = comments.filter(
    (c) =>
      c.username.toLowerCase().includes(search.toLowerCase()) ||
      c.course_title_title.toLowerCase().includes(search.toLowerCase()) ||
      c.comment_text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800">Comments</h3>
        <input
          type="text"
          placeholder="Search comments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Comments */}
      <div className="space-y-6">
        {filteredComments.map((c) => (
          <div key={c.comment_id} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                {c.username.charAt(0)}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{c.username}</p>
                    <p className="text-xs text-gray-500">{c.course_title} • {new Date(c.comment_date).toISOString().slice(0, 10)}</p>
                  </div>
                </div>

                <p className="mt-2 text-gray-700">{c.comment_text}</p>

                
                <div className="mt-3 pl-2 border-l border-gray-200 space-y-3">
                  {(c.replies || []).map((reply, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-md p-3 text-sm text-gray-700">
                      {/* <div className="flex justify-between">
                        <p className="font-medium text-gray-800">Instructor Reply {idx + 1}:</p>
                      </div> */}

                      {editing && editing.id === c.comment_id && editing.idx === idx ? (
                        <div className="mt-2">
                          <textarea
                            rows="2"
                            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={editDraft}
                            onChange={(e) => setEditDraft(e.target.value)}
                          />
                          <div className="mt-2 flex gap-2">
                            <button onClick={handleSaveEdit} className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                              Save
                            </button>
                            <button onClick={() => { setEditing(null); setEditDraft(""); }} className="px-3 py-1 bg-gray-400 text-white rounded-md text-sm hover:bg-gray-500">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="ml-2 mt-1">{reply.reply_text}</p>
                          <div className="mt-2 flex gap-3">
                            <button onClick={() => handleStartEdit(c.comment_id, idx)} className="text-yellow-600 text-sm hover:underline">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(c.comment_id, idx)} className="text-red-600 text-sm hover:underline">
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                  
                  {activeReply === c.comment_id ? (
                    <div className="mt-2">
                      <textarea
                        rows="2"
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write a reply..."
                        value={drafts[c.comment_id] || ""}
                        onChange={(e) => setDrafts({ ...drafts, [c.comment_id]: e.target.value })}
                      />
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => handleReplySubmit(c.id)} className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
                          Submit
                        </button>
                        <button onClick={() => { setActiveReply(null); setDrafts((d) => ({ ...d, [c.id]: "" })); }} className="px-3 py-1 bg-gray-400 text-white rounded-md text-sm hover:bg-gray-500">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <button onClick={() => setActiveReply(c.id)} className="text-blue-600 text-sm font-medium hover:underline mt-1">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredComments.length === 0 && (
          <div className="text-center py-10 text-gray-500">No comments found.</div>
        )}
      </div>
    </div>
  );
};

export default CommentsReplies;
