import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { SummarySection } from './SummarySection'
import { WeekList } from './WeekList'
import { ThemeToggle } from './ThemeToggle'
import { DatasetSelector, type DatasetType } from './DatasetSelector'
import { useProgress } from '../hooks/useProgress'
import { getProblemCounts } from '../data/unified_data'
import './Layout.css'

export const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedDataset, setSelectedDataset] = useState<DatasetType>('grind75')
  const progress = useProgress()

  return (
    <div className='layout'>
      <header className='header'>
        <div className='header-content'>
          <div className='header-left'>
            <h1 className='header-title'>
              <span className='grind-text'>DSA King</span>
              <span className='subtitle'>By Sanjeev Jha</span>
            </h1>
          </div>

          <div className='header-right'>
            <ThemeToggle />

            <button
              className='mobile-menu-button'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className='mobile-menu'>
            <a
              href='https://www.techinterviewhandbook.org'
              className='mobile-nav-link'
            >
              Tech Interview Handbook
            </a>
          </div>
        )}
      </header>

      <main className='main-content'>
        <div className='content-wrapper'>
          <DatasetSelector
            currentDataset={selectedDataset}
            onDatasetChange={setSelectedDataset}
            problemCounts={getProblemCounts()}
          />

          <SummarySection
            progress={progress}
            selectedDataset={selectedDataset}
          />

          <WeekList
            showTopics={false}
            progress={progress}
            groupBy='none'
            viewingMode='questions'
            selectedDataset={selectedDataset}
          />
        </div>
      </main>

      <footer className='footer'>
        <div className='footer-content'>
          <div className='footer-section'>
            <h3>Have feedback or questions?</h3>
            <p>
              If you have any feedback or questions, feel free to email us! We
              will get back to you as soon as possible.
            </p>
            <a
              href='mailto:sanjeevjha882@gmail.com'
              className='footer-email'
            >
              sanjeevjha882@gmail.com
            </a>
          </div>
          <div className='footer-copyright'>
            © 2025 DSA King by Sanjeev Jha. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
