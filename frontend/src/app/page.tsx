export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-white dark:bg-black px-6">
      <main className="flex flex-col items-center gap-8 text-center max-w-lg">
        <span className="text-5xl">📲</span>
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
          Kobo
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          A USSD Stellar Wallet. Send, receive, and hold money on Stellar from
          any phone — no smartphone, no internet, no app. Just dial a code.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="https://github.com/Kobopay1/Kobo"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            View on GitHub
          </a>
          <a
            href="https://stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-200 dark:border-zinc-700 px-6 py-3 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            Built on Stellar
          </a>
        </div>
      </main>
    </div>
  );
}
