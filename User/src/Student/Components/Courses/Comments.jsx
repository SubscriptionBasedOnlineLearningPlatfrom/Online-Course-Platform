import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const { courseId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Dummy comments data
  const dummyComments = [
    {
      comment_id: "1",
      user_name: "Sarah Johnson",
      user_avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?fit=crop&w=150&q=80",
      rating: 5,
      comment_text: "This course is absolutely fantastic! The instructor explains complex concepts in a very clear and understandable way. I've learned so much and feel confident about building web applications now.",
      created_at: "2024-08-05T10:30:00Z",
      updated_at: null,
      is_verified_purchase: true,
      helpful_count: 24,
      course_progress: 95,
      replies: [
        {
          reply_id: "r1",
          user_name: "Course Instructor",
          user_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&q=80",
          reply_text: "Thank you so much for the kind words, Sarah! I'm thrilled to hear about your progress. Keep up the great work!",
          created_at: "2024-08-05T15:20:00Z",
          is_instructor: true
        }
      ]
    },
    {
      comment_id: "2",
      user_name: "Mike Chen",
      user_avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&q=80",
      rating: 4,
      comment_text: "Great course overall! The content is well-structured and the projects are practical. My only suggestion would be to include more advanced topics in the later modules. But definitely worth the investment!",
      created_at: "2024-08-03T14:45:00Z",
      updated_at: "2024-08-03T16:20:00Z",
      is_verified_purchase: true,
      helpful_count: 18,
      course_progress: 78,
      replies: []
    },
    {
      comment_id: "3",
      user_name: "Emily Rodriguez",
      user_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=150&q=80",
      rating: 5,
      comment_text: "I'm a complete beginner and this course made everything so accessible. The step-by-step approach and hands-on projects really helped me grasp the concepts. Highly recommended for anyone starting their coding journey!",
      created_at: "2024-08-01T09:15:00Z",
      updated_at: null,
      is_verified_purchase: true,
      helpful_count: 31,
      course_progress: 100,
      replies: [
        {
          reply_id: "r2",
          user_name: "David Kim",
          user_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&q=80",
          reply_text: "I totally agree! This course is perfect for beginners. The pacing is just right.",
          created_at: "2024-08-01T12:30:00Z",
          is_instructor: false
        }
      ]
    },
    {
      comment_id: "4",
      user_name: "Alex Thompson",
      user_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&q=80",
      rating: 4,
      comment_text: "Solid course with good production quality. The instructor is knowledgeable and the examples are relevant. I would have liked to see more real-world deployment scenarios covered.",
      created_at: "2024-07-28T16:20:00Z",
      updated_at: null,
      is_verified_purchase: true,
      helpful_count: 12,
      course_progress: 85,
      replies: []
    },
    {
      comment_id: "5",
      user_name: "Lisa Wang",
      user_avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?fit=crop&w=150&q=80",
      rating: 3,
      comment_text: "The course content is good but I felt some sections were too rushed. Would benefit from more detailed explanations in the advanced topics. Still learning a lot though!",
      created_at: "2024-07-25T11:10:00Z",
      updated_at: null,
      is_verified_purchase: true,
      helpful_count: 8,
      course_progress: 60,
      replies: []
    },
    {
      comment_id: "6",
      user_name: "James Wilson",
      user_avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=150&q=80",
      rating: 5,
      comment_text: "Exceeded my expectations! The course is comprehensive, well-organized, and the instructor's teaching style is engaging. I've already started applying what I learned in my job. Money well spent!",
      created_at: "2024-07-22T13:45:00Z",
      updated_at: null,
      is_verified_purchase: true,
      helpful_count: 27,
      course_progress: 100,
      replies: []
    }
  ];

  // Simulate loading and set dummy data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setComments(dummyComments);
      setLoading(false);
    }, 1000);
  }, [courseId]);

  // Calculate average rating
  const averageRating = comments.length > 0 
    ? (comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length).toFixed(1)
    : 0;

  // Get rating distribution
  const ratingDistribution = {
    5: comments.filter(c => c.rating === 5).length,
    4: comments.filter(c => c.rating === 4).length,
    3: comments.filter(c => c.rating === 3).length,
    2: comments.filter(c => c.rating === 2).length,
    1: comments.filter(c => c.rating === 1).length,
  };

  // Handle new comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || rating === 0) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCommentObj = {
        comment_id: Date.now().toString(),
        user_name: "Current User",
        user_avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=150&q=80",
        rating: rating,
        comment_text: newComment,
        created_at: new Date().toISOString(),
        updated_at: null,
        is_verified_purchase: true,
        helpful_count: 0,
        course_progress: 75,
        replies: []
      };

      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setRating(0);
      setIsSubmitting(false);
    }, 1000);
  };

  // Handle reply submission
  const handleSubmitReply = (commentId) => {
    if (!replyText.trim()) return;

    const newReply = {
      reply_id: Date.now().toString(),
      user_name: "Current User",
      user_avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=150&q=80",
      reply_text: replyText,
      created_at: new Date().toISOString(),
      is_instructor: false
    };

    setComments(comments.map(comment => 
      comment.comment_id === commentId 
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment
    ));

    setReplyText('');
    setShowReplyForm(null);
  };

  

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // Render stars
  const renderStars = (rating, interactive = false, onRate = null) => {
    return [...Array(5)].map((_, index) => {
      const starNumber = index + 1;
      const isActive = interactive 
        ? starNumber <= (hoverRating || rating)
        : starNumber <= rating;

      return (
        <button
          key={index}
          type="button"
          className={`text-2xl ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${
            isActive ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => interactive && onRate && onRate(starNumber)}
          onMouseEnter={() => interactive && setHoverRating(starNumber)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          disabled={!interactive}
        >
          ★
        </button>
      );
    });
  };

  if (loading) {
    return (
      <div className="mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

 return (
  <div className="mt-12 max-w-7xl mx-auto px-6">
    {/* Comments Section */}
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-600 text-white rounded-lg p-2 mr-3">
            💬
          </span>
          Student Reviews ({comments.length})
        </h2>
      </div>

      {/* Rating Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <span className="text-5xl font-bold text-gray-900 mr-4">{averageRating}</span>
              <div>
                <div className="flex text-yellow-400 text-xl mb-1">
                  {renderStars(Math.round(parseFloat(averageRating)))}
                </div>
                <p className="text-gray-600 text-sm">Based on {comments.length} reviews</p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <span className="text-sm font-medium text-gray-700 w-8">{star}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ 
                      width: `${comments.length > 0 ? (ratingDistribution[star] / comments.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">
                  {ratingDistribution[star]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Comment Form */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h3>
        <form onSubmit={handleSubmitComment}>
          {/* Rating Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <div className="flex items-center space-x-1">
              {renderStars(rating, true, setRating)}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0 && `(${rating} star${rating !== 1 ? 's' : ''})`}
              </span>
            </div>
          </div>

          {/* Comment Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this course..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows="4"
              maxLength="500"
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {newComment.length}/500 characters
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!newComment.trim() || rating === 0 || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Posting...
              </div>
            ) : (
              'Post Review'
            )}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg mb-2">No reviews yet</p>
            <p className="text-gray-400 text-sm">Be the first to share your experience!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.comment_id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                {/* User Avatar */}
                <img
                  src={comment.user_avatar}
                  alt={comment.user_name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1">
                  {/* User Info and Rating */}
                  <div className="flex items-center justify-between mb-2">
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400 text-sm">
                        {renderStars(comment.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(comment.created_at)}</span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${comment.course_progress}%` }}
                        ></div>
                      </div>
                      <span>{comment.course_progress}% complete</span>
                    </div>
                  </div>

                  {/* Comment Text */}
                  <p className="text-gray-700 leading-relaxed mb-4">{comment.comment_text}</p>

                  {/* Updated indicator */}
                  {comment.updated_at && (
                    <p className="text-xs text-gray-500 italic mb-3">
                      Updated on {formatDate(comment.updated_at)}
                    </p>
                  )}

                  {/* Comment Actions */}
                  <div className="flex items-center space-x-6 text-sm">

                    <button 
                      onClick={() => setShowReplyForm(showReplyForm === comment.comment_id ? null : comment.comment_id)}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Reply
                    </button> 
                  </div>

                  {/* Reply Form */}
                  {showReplyForm === comment.comment_id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your reply..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="3"
                      />
                      <div className="flex items-center space-x-3 mt-3">
                        <button
                          onClick={() => handleSubmitReply(comment.comment_id)}
                          disabled={!replyText.trim()}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          Post Reply
                        </button>
                        <button
                          onClick={() => {
                            setShowReplyForm(null);
                            setReplyText('');
                          }}
                          className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.reply_id} className="bg-gray-50 rounded-lg p-4 ml-4">
                          <div className="flex items-start space-x-3">
                            <img
                              src={reply.user_avatar}
                              alt={reply.user_name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h5 className="font-medium text-gray-900 text-sm">{reply.user_name}</h5>
                                {reply.is_instructor && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                    Instructor
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">{formatDate(reply.created_at)}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.reply_text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {comments.length > 0 && (
        <div className="text-center mt-8">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors duration-200">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  </div>
);
};

export default Comments;