import { currentUser } from '@/lib/mockData'
import { formatDate, getGreeting } from '@/lib/utils'

export default function Greeting() {
  const greeting = getGreeting()
  const today = formatDate(new Date())

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
      <h1 className="text-2xl font-bold mb-2">
        {greeting}, {currentUser.name}!
      </h1>
      <p className="text-blue-100 mb-4">
        Today is {today}, let's continue our recovery journey together 💪
      </p>
      <div className="flex items-center text-sm text-blue-100">
        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
        Recovery Day {Math.floor((Date.now() - new Date(currentUser.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
      </div>
    </div>
  )
}
