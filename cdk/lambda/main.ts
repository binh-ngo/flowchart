
export async function handler(event: any): Promise<any> {
  console.log(`EVENT --- ${JSON.stringify(event)}`);
  const eventType = getEventType(event);

//   if (eventType === "Chef") {
//       return handleChefEvent(event);
//     } else if (eventType === "Post") {
//       return handlePostEvent(event);
//     } 
//   //   else if (eventType === "Comment") {
//   //     return handleCommentEvent(event);
//   //   } 
//       else if(eventType === "Tag") {
//       return handleTagEvent(event);
//     } 
//   //   else if (eventType === "Review") {
//   //     return handleReviewEvent(event)
//   //   } 
//     else {
//       throw new Error(`Unknown event type.`);
//     }
}  

// Function to determine the event type based on the field name
function getEventType(event: any): "Chef" | "Post" | "Comment" | "Tag" | "Review" {
  switch (event.info.fieldName) {
    case "getAllChefs":
    case "getChefById":
    case "createChef":
    case "deleteChef":
    case "updateChef":
      return "Chef";
    case "getAllPosts":
    case "getPublishedPosts":
    case "getUnpublishedPosts":
    case "getAllPostsFromAllChefs":
    case "getPostById":
    case "createPost":
    case "publishPost":
    case "deletePost":
    case "updatePost":
      return "Post";
    case "getCommentById":
    case "createComment":
    case "updateComment":
    case "deleteComment":
      return "Comment";
    case "getAllTags":
    case "getTagById":
    case "createTag":
    case "deleteTag":
      return "Tag";
    case "getReviewById":
    case "getAllReviews":
    case "createReview":
    case "deleteReview":
    case "updateReview":
      return "Review";
    default:
      throw new Error(`Unknown field name: ${event.info.fieldName}`);
  }
}
