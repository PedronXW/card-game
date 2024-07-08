import { Loading } from './Loading'

type ButtonProps = {
  text: string
  action: () => void
  waiting?: boolean
  able?: boolean
}

export const Button = ({
  text,
  action,
  waiting = false,
  able = true,
}: ButtonProps) => {
  return (
    <button
      disabled={!able}
      onClick={action}
      className="drop-shadow-xl bg-white w-full text-center rounded-lg max-w-96 h-20 disabled:opacity-50 disabled:cursor-wait"
    >
      {waiting ? (
        <Loading />
      ) : (
        <h1 className="text-black font-bold text-xl">{text}</h1>
      )}
    </button>
  )
}
