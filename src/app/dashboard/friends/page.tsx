'use client'

import { friends } from '@/lib/mockData'
import { cn } from '@/lib/utils'
import { Clock, MessageCircle, Search, User } from 'lucide-react'
import { useState } from 'react'

export default function FriendsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.injuryType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatLastCheckIn = (timestamp: string) => {
    const now = new Date()
    const checkInTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - checkInTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just active'
    if (diffInHours < 24) return `Active ${diffInHours}h ago`
    return `Active ${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Recovery Friends</h1>
        <p className="text-gray-600">Connect with like-minded recovery companions, encourage each other, and progress together</p>
      </div>

      {/* 搜索栏 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search friend names or recovery types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Friends</p>
              <p className="text-2xl font-bold text-gray-900">{friends.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Online Friends</p>
              <p className="text-2xl font-bold text-gray-900">
                {friends.filter(f => f.isOnline).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Today's Interactions</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* 伙伴列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Friends List ({filteredFriends.length})
          </h2>
        </div>

        <div className="p-6">
          {filteredFriends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        {friend.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                        <p className="text-sm text-gray-500">{friend.injuryType}</p>
                      </div>
                    </div>

                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      friend.isOnline
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    )}>
                      {friend.isOnline ? 'Online' : 'Offline'}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {friend.lastCheckIn && formatLastCheckIn(friend.lastCheckIn)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Joined: {new Date(friend.joinDate).toLocaleDateString('en-US')}
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matching friends found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or clearing the search box</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
