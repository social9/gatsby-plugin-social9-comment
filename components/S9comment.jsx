import React from 'react'
import { insertScript, removeScript, shallowComparison } from '../utils'

export default class S9comment extends React.Component {
  
  constructor(props) {
    super(props)
    this.embedUrl = `https://social9.com/comments/js/commento.js`
  }
  
  componentDidMount() {
    this.loadInstance()
  }
  
  shouldComponentUpdate(nextProps) {
    if (this.props === nextProps) {
      return false
    }
    return shallowComparison(this.props, nextProps)
  }
  
  componentDidUpdate() {
    this.loadInstance()
  }

  componentWillUnmount() {
    this.cleanInstance()
  }
  
  loadInstance() {
    if (typeof window !== 'undefined' && window.document) {
      if (window.document.getElementById('social9Comments')) {
        this.reloadInstance()
      } else {
        insertScript(this.embedUrl, 'social9Comments', window.document.body)
      }
    }
  }
  
  reloadInstance() {
    if (window && window.S9COMMENTS) {
      window.S9COMMENTS.reset({
        reload: true,
      })
    }
  }

  cleanInstance() {
    removeScript('social9Comments', window.document.body)
    try {
      delete window.S9COMMENTS
    } catch (error) {
      window.S9COMMENTS = undefined
    }
    const thread = window.document.getElementById('s9comments')
    if (thread) {
      while (thread.hasChildNodes()) {
        thread.removeChild(thread.firstChild)
      }
    }
  }

  render() {
    return (
      <div id='s9comments'></div>
    )
  }
}
