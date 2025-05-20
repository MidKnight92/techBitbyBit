import SectionContainer from './SectionContainer'
import Footer from './Footer'
import Header from './Header'
import { Props } from 'types/childrenOnly'

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className={`flex h-screen flex-col justify-between font-sans`}>
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
