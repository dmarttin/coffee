import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { View } from "react-native";
import { cn } from "../lib/utils";
import CommentCard from "./CommentCard";
import { Text } from "./ui/Text";

const commentListVariants = cva("w-full", {
  variants: {
    density: {
      cozy: "gap-4",
      tight: "gap-2",
    },
  },
  defaultVariants: {
    density: "cozy",
  },
});

export type CommentListItem = {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  text: string;
  createdAt: string | Date;
  likes?: number;
};

export type CommentListProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof commentListVariants> & {
    comments: CommentListItem[];
    onLike?: (comment: CommentListItem) => void;
  };

const CommentList = React.forwardRef<
  React.ElementRef<typeof View>,
  CommentListProps
>(({ className, density, comments, onLike, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(commentListVariants({ density, className }))}
      {...props}
    >
      {comments.length === 0 ? (
        <Text className="text-sm text-muted-foreground">
          No comments yet.
        </Text>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            username={comment.username}
            displayName={comment.displayName}
            avatarUrl={comment.avatarUrl}
            text={comment.text}
            createdAt={comment.createdAt}
            likes={comment.likes}
            onLike={onLike ? () => onLike(comment) : undefined}
          />
        ))
      )}
    </View>
  );
});

CommentList.displayName = "CommentList";

export default CommentList;
export { commentListVariants };
