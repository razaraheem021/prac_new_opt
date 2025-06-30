// App.jsx or any page
import React from "react";
import ServerDataTable from "../components/ServerDataTable";

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    size: 60,
  },
  {
    accessorKey: "userId",
    header: "User ID",
    //  size: 200,
  },
  {
    accessorKey: "title",
    header: "Title",
    // size: 300,
  },
  {
    accessorKey: "body",
    header: "Body",
    // size: 400,
  },
];

function App() {
  const apiConfig = {
    endpoint: 'https://jsonplaceholder.typicode.com/posts',
    totalItems: 100, // JSONPlaceholder has 100 posts
    queryKey: 'posts'
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">JSONPlaceholder Posts (Auto Server-Side Pagination)</h1>
      <p className="text-gray-600 mb-6">
        Powered by TanStack Query with automatic server-side pagination from{" "}
        <a href="https://jsonplaceholder.typicode.com" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
          JSONPlaceholder API
        </a>
      </p>
      <ServerDataTable 
        columns={columns}
        apiConfig={apiConfig}
        initialPageSize={30}
      />
    </div>
  );
}

export default App;
