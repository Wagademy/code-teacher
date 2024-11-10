import { PlayCircle, RotateCw, Trash2 } from 'lucide-react';

type BlockPageProps = {
  chatsCount: number;
  messagesCount: number;
};

export function BlockPage({
  chatsCount,
  messagesCount,
}: BlockPageProps) {
  // Add mock data array
  const exercises = [
    {
      name: 'JavaScript Basics',
      progress: 75,
      lastAccessed: '2 days ago',
    },
    {
      name: 'React Components',
      progress: 25,
      lastAccessed: '5 days ago',
    },
    {
      name: 'API Integration',
      progress: 50,
      lastAccessed: '1 week ago',
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Chats with Tutor
          </h2>
          <p className="text-3xl text-green-500 font-bold mt-2">
            {chatsCount}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">Total Messages</h2>
          <p className="text-3xl text-green-500 font-bold mt-2">
            {messagesCount}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Exercises Completed
          </h2>
          <p className="text-3xl text-green-500 font-bold mt-2">47</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Projects Showcased
          </h2>
          <p className="text-3xl text-green-500 font-bold mt-2">2</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Exercises</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-center p-4 font-semibold text-gray-600">
                  Exercise Name
                </th>
                <th className="text-center p-4 font-semibold text-gray-600">
                  Progress
                </th>
                <th className="text-center p-4 font-semibold text-gray-600">
                  Last Interaction
                </th>
                <th className="text-center p-4 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise) => (
                <tr key={exercise.name} className="border-b border-gray-100">
                  <td className="p-4 text-center text-gray-800">
                    {exercise.name}
                  </td>
                  <td className="p-4 text-center items-center">
                    <div className="flex flex-row text-center items-center justify-center">
                      <div className="w-48 h-2 text-center bg-gray-200 rounded-full">
                        <div
                          className="h-2 text-center bg-green-500 rounded-full"
                          style={{ width: `${exercise.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm ml-2 text-center text-gray-600">
                        {exercise.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center text-gray-600">
                    {exercise.lastAccessed}
                  </td>
                  <td className="p-4 text-center">
                    <button className="px-3 py-1 text-sm text-green-600 hover:text-green-700 inline-flex items-center gap-1">
                      <PlayCircle className="w-4 h-4 inline" />
                    </button>
                    <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                      <RotateCw className="w-4 h-4 inline" />
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700 inline-flex items-center gap-1">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
