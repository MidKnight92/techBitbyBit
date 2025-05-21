import { Props } from 'types/childrenOnly'

const TableWrapper = ({ children }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper
