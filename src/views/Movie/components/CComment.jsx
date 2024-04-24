import { memo, useState } from "react";
import cls from "./style.module.css";

const CComment = ({ comment }) => {
  const [isOriginalComment, setIsOriginalComment] = useState(false);


  if (comment?.length < 220) return <p>{comment}</p>

  return (
    <p className={cls.commentBox}>
      {
        isOriginalComment
          ? comment
          : comment.slice(0, 220) + "..."
      }
      <button onClick={() => setIsOriginalComment(prev => !prev)} className={cls.button}>
        {
          isOriginalComment ? "less" : "more"
        }
      </button>
    </p>
  )
}

export default memo(CComment);