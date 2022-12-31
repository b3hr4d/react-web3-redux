import { CHAINS } from "../../utils/chains"

interface ChainProps {
  chainId?: number
}

const Chain: React.FC<ChainProps> = ({ chainId }) => {
  if (chainId === undefined) return null

  return <small>({CHAINS[chainId]?.name || chainId})</small>
}

export default Chain
