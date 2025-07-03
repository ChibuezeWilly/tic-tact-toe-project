import TicTacToe from "./tic-tac-toe";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-lime-200 p-4">
      <h1 className="text-5xl font-bold mb-2 text-center">Tic-Tac-Toe</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Play Tic-Tac-Toe with friends and see who’s the real champion!</p>
      <TicTacToe />
      <footer className="mt-16 text-center text-xs text-gray-400">
        Built with React 19, Next.js 15, Tailwind CSS, and shadcn/ui
      </footer>
    </main>
  );
}
