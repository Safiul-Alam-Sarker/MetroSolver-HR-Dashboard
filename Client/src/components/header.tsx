"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import profileImg from "../assets/sample_profile.jpg";
import { useState } from "react";
import {
  Bell,
  BellDot,
  SearchIcon,
  Edit3,
  Camera,
  EditIcon,
} from "lucide-react";
import { useAppSelector } from "../components/hooks/redux";
import UserUpdateModal from "./userUpdateModal";

const Header = () => {
  const [notificationAvailable, setNotificationAvailable] =
    useState<Boolean>(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Get user data and loading state from Redux store
  const { user, loading } = useAppSelector((state) => state.auth);

  const handleEditProfile = () => {
    setIsUpdateModalOpen(true);
  };

  const handleUpdateComplete = (updatedUser: any) => {
    setIsUpdateModalOpen(false);
  };

  return (
    <>
      <header className="w-full bg-white backdrop-blur-sm border-b border-gray-200 h-20 px-8 items-center">
        <div className="flex justify-between w-full items-center h-full">
          <div>
            <InputGroup>
              <InputGroupInput
                placeholder="Search something here..."
                className="w-[400px] shadow-sm"
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="flex items-center justify-center gap-5">
            <div className="border shadow-xl w-12 h-12 flex items-center justify-center rounded-full cursor-pointer">
              {notificationAvailable ? (
                <BellDot className="text-red-400" />
              ) : (
                <Bell />
              )}
            </div>
            <div className="flex gap-3">
              {/* Profile Image with Edit Overlay */}
              <div
                className="relative border shadow-xl w-12 h-12 flex items-center justify-center rounded-full overflow-hidden cursor-pointer group"
                onClick={handleEditProfile}
              >
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-full" />
                ) : (
                  <>
                    <img
                      src={user?.profileImageUrl || profileImg}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    {/* Edit Overlay - Still shows on hover only */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  </>
                )}
              </div>

              {/* User Info with Edit Icon */}
              <div className="flex flex-col items-center justify-center relative">
                {loading ? (
                  <>
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1" />
                    <div className="h-3 w-16 bg-gray-200 animate-pulse rounded" />
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">
                        {user
                          ? `${user.firstName} ${user.lastName}`
                          : "Guest User"}
                      </p>
                      {/* Edit Icon - ALWAYS VISIBLE NOW */}
                      <button
                        onClick={handleEditProfile}
                        className="p-1 text-white hover:bg-gray-100 rounded-full transition-colors"
                        title="Edit profile"
                      >
                        <EditIcon className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                      </button>
                    </div>
                    <p className="text-black/50">
                      {user?.Designatin || "No designation set"}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* User Update Modal */}
      <UserUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdate={handleUpdateComplete}
        user={user}
      />
    </>
  );
};

export default Header;
