import React, { useState, useEffect, useRef } from "react";
import {
  useDaily,
  DailyVideo,
  useParticipantIds,
  useLocalSessionId,
  useAudioTrack,
  DailyAudio,
} from "@daily-co/daily-react";
import { createConversation } from "../api/createConversation";
import type { IConversation } from "../types";
import { endConversation } from "../api";

const Video: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <DailyVideo
        sessionId={id}
        type="video"
        className="w-full h-auto rounded-lg shadow-lg"
        style={{ aspectRatio: "16 / 9" }}
      />
    </div>
  );
};

const Call = ({ onLeave }: { onLeave: () => void }) => {
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });
  const localParticipantId = useLocalSessionId();
  const localAudio = useAudioTrack(localParticipantId);
  const daily = useDaily();
  const isMicEnabled = !localAudio.isOff;

  const toggleMicrophone = () => {
    daily?.setLocalAudio(!isMicEnabled);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        {remoteParticipantIds.length > 0 ? (
          <Video id={remoteParticipantIds[0]} />
        ) : (
          <div className="w-full max-w-md mx-auto h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Connecting to BrainMate...</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleMicrophone}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isMicEnabled
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {isMicEnabled ? 'Mute' : 'Unmute'}
        </button>
        <button
          onClick={onLeave}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          End Call
        </button>
      </div>
      <DailyAudio />
    </div>
  );
};

const BrainMate: React.FC = () => {
  const [conversation, setConversation] = useState<IConversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const DailyCall = useDaily();

  const apiKey = "2b65ef86349841bbbee6451902796a78";

  const startCall = async () => {
    if (DailyCall && !conversation && !loading) {
      setLoading(true);
      setError(null);
      try {
        const newConversation = await createConversation(apiKey);
        await DailyCall.join({ url: newConversation.conversation_url });
        setConversation(newConversation);
      } catch (error) {
        setError(`Failed to start conversation: ${error}`);
      }
      setLoading(false);
    }
  };

  const handleLeaveCall = () => {
    DailyCall?.leave();
    if (conversation) {
      endConversation(conversation.conversation_id, apiKey);
    }
    setConversation(null);
  };

  const handleRestartCall = async () => {
    if (conversation) {
      handleLeaveCall();
    }
    
    setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const newConversation = await createConversation(apiKey);
        await DailyCall?.join({ url: newConversation.conversation_url });
        setConversation(newConversation);
      } catch (error) {
        setError(`Failed to restart conversation: ${error}`);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">BrainMate</h1>
        <p className="text-gray-600 dark:text-gray-400">Your AI learning companion</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Starting conversation...</p>
          </div>
        )}

        {conversation && !loading ? (
          <div>
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-700 dark:text-green-300 font-medium">
                🎉 Connected to BrainMate! Start asking questions about any topic you're learning.
              </p>
            </div>
            <Call onLeave={handleLeaveCall} />
          </div>
        ) : !loading && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🧠</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Your AI Learning Companion
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              BrainMate is here to help you understand complex topics, answer your questions, and guide your learning journey.
            </p>
            <div className="space-y-4">
              <button
                onClick={startCall}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                Start Conversation
              </button>
              {conversation && (
                <button
                  onClick={handleRestartCall}
                  className="w-full sm:w-auto ml-4 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Restart Conversation
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Learning</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ask questions and get instant explanations on any topic
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personalized Help</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get explanations tailored to your learning level and interests
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-time Support</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get immediate help when you're stuck on a concept
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrainMate;