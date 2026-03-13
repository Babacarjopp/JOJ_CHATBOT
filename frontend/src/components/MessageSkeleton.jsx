// frontend/src/components/MessageSkeleton.jsx
// Skeleton animé pendant que le bot réfléchit

export default function MessageSkeleton() {
  return (
    <div className="message-row bot-row skeleton-row">
      {/* Avatar skeleton */}
      <div className="bot-avatar skeleton-avatar" />

      {/* Bulle skeleton */}
      <div className="skeleton-bubble">
        <div className="skeleton-line skeleton-line-lg" />
        <div className="skeleton-line skeleton-line-md" />
        <div className="skeleton-line skeleton-line-sm" />
      </div>
    </div>
  )
}