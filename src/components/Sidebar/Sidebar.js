import React from 'react'
import Stickyfill from 'stickyfilljs'
import PropTypes from 'prop-types'

import styles from './Sidebar.module.scss'

const nodeListToArray = nodeList => {
  const array = []
  for (var i = 0, ref = (array.length = nodeList.length); i < ref; i++) {
    array[i] = nodeList[i]
  }
  return array
}

const chapterList = [
  { anchor: '#chapter-1', label: '第一章: 總則' },
  { anchor: '#chapter-2', label: '第二章: 中央和香港特別行政區的關係' },
  { anchor: '#chapter-3', label: '第三章: 居民的基本權利和義務' },
  {
    anchor: '#chapter-4',
    label: '第四章: 政治體制',
    sectionList: [
      { anchor: '#chapter-4-section-1', label: '第一節 - 行政長官' },
      { anchor: '#chapter-4-section-2', label: '第二節 - 行政機關' },
      { anchor: '#chapter-4-section-3', label: '第三節 - 立法機關' },
      { anchor: '#chapter-4-section-4', label: '第四節 - 司法機關' },
      { anchor: '#chapter-4-section-5', label: '第五節 - 區域組織' },
      { anchor: '#chapter-4-section-6', label: '第六節 - 公務人員' },
    ],
  },
  {
    anchor: '#chapter-5',
    label: '第五章: 經濟',
    sectionList: [
      { anchor: '#chapter-5-section-1', label: '第一節 - 財政、金融、貿易和工商業' },
      { anchor: '#chapter-5-section-2', label: '第二節 - 土地契約' },
      { anchor: '#chapter-5-section-3', label: '第三節 - 航運' },
      { anchor: '#chapter-5-section-4', label: '第四節 - 民用航空' },
    ],
  },
  { anchor: '#chapter-6', label: '第六章: 教育、科學、文化、體育、宗教、勞工和社會服務' },
  { anchor: '#chapter-7', label: '第七章: 對外事務' },
  { anchor: '#chapter-8', label: '第八章: 本法的解釋和修改' },
  { anchor: '#chapter-9', label: '第九章: 附則' },
]

class Sidebar extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const chapters = document.querySelectorAll('[id^="chapter-"]')
    this.chapters = nodeListToArray(chapters).reduce(
      (all, chapter) => ({
        ...all,
        [chapter.id]: chapter.offsetTop,
      }),
      {},
    )
    window.addEventListener('scroll', this.scrollHandler)
    this.scrollHandler()
    Stickyfill.addOne(this.container)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
    Stickyfill.removeOne(this.container)
  }

  scrollHandler = () => {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop
    const ids = Object.keys(this.chapters)

    let last = 'chapter-1'
    for (let index = 0; index < ids.length; index += 1) {
      const key = ids[index]
      if (this.chapters[key] <= scrollPosition) {
        last = key
      }
    }

    const link = document.querySelector(`[href="#${last}"]`)
    const activeLinks = document.querySelector('[data-is-active]')
    if (activeLinks) {
      document.querySelector('[data-is-active]').removeAttribute('data-is-active')
    }
    link.setAttribute('data-is-active', true)
  }

  render() {
    const { onClick } = this.props

    return (
      <div ref={ref => (this.container = ref)} className={styles.container} data-list>
        <ul className={styles.list}>
          {chapterList.map(chapter => (
            <li key={chapter.anchor} className={styles.listItem}>
              <a href={chapter.anchor} onClick={onClick}>
                {chapter.label}
              </a>
              {chapter.sectionList && (
                <ul className={styles.subList}>
                  {chapter.sectionList.map(section => (
                    <li key={section.anchor} className={styles.subListItem}>
                      <a href={section.anchor} onClick={onClick}>
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Sidebar
