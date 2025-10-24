"use client";

import { Video, Phone, MessageCircle, ExternalLink } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: string;
  participants: string[];
  color: string;
  date: Date;
  description?: string;
  platform?: string;
  meetingLink?: string;
  status?: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
  };
}

interface CalendarEventCardProps {
  event: CalendarEvent;
}

const CalendarEventCard = ({ event }: CalendarEventCardProps) => {
  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case "zoom":
        return "🔷"; // Zoom blue circle
      case "meet":
        return "🟢"; // Google Meet green circle
      case "teams":
        return "🔵"; // Teams blue circle
      case "slack":
        return "🎯"; // Slack icon
      default:
        return "📅"; // Default calendar
    }
  };

  const getPlatformName = (platform?: string) => {
    switch (platform) {
      case "zoom":
        return "Zoom";
      case "meet":
        return "Google Meet";
      case "teams":
        return "Microsoft Teams";
      case "slack":
        return "Slack";
      case "other":
        return "Other Platform";
      default:
        return "Meeting";
    }
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-3 h-3" />;
      case "audio":
        return <Phone className="w-3 h-3" />;
      case "message":
        return <MessageCircle className="w-3 h-3" />;
      default:
        return <Video className="w-3 h-3" />;
    }
  };

  const formatTimeRange = (startTime: string, endTime: string) => {
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div
      className={`${event.color} text-white rounded-lg p-2 text-xs cursor-pointer hover:opacity-90 transition-opacity shadow-sm border border-white/20`}
    >
      {/* Event Header */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate text-white">{event.title}</h3>
        </div>
        <div className="flex items-center gap-1 ml-1 flex-shrink-0">
          {getConversationIcon(event.type)}
          {event.meetingLink && (
            <a
              href={event.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-white/80 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Organizer Info */}
      <div className="flex items-center gap-2 mb-1">
        {/* Organizer Avatar */}
        <div className="flex-shrink-0">
          {event.organizer.profileImageUrl ? (
            <img
              src={event.organizer.profileImageUrl}
              alt={`${event.organizer.firstName} ${event.organizer.lastName}`}
              className="w-4 h-4 rounded-full object-cover border border-white/30"
            />
          ) : (
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
              <span className="text-[8px] font-medium text-white">
                {getInitials(
                  event.organizer.firstName,
                  event.organizer.lastName
                )}
              </span>
            </div>
          )}
        </div>

        {/* Organizer Name */}
        <span className="text-white/90 text-[10px] truncate flex-1">
          {event.organizer.firstName} {event.organizer.lastName}
        </span>
      </div>

      {/* Time and Platform */}
      <div className="space-y-1">
        {/* Time */}
        <div className="text-white/80 text-[10px] font-medium">
          {formatTimeRange(event.startTime, event.endTime)}
        </div>

        {/* Platform */}
        {event.platform && (
          <div className="flex items-center gap-1">
            <span className="text-[10px]">
              {getPlatformIcon(event.platform)}
            </span>
            <span className="text-white/80 text-[10px] truncate">
              {getPlatformName(event.platform)}
            </span>
          </div>
        )}
      </div>

      {/* Participants Count (if any) */}
      {event.participants.length > 0 && (
        <div className="mt-1 flex items-center gap-1">
          <span className="text-white/70 text-[9px]">
            +{event.participants.length} participant
            {event.participants.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
};

export default CalendarEventCard;
