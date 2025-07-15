import React from 'react'

/**
 * Utility function to highlight matching text in a string
 * @param text - The text to highlight matches in
 * @param searchTerm - The search term to highlight
 * @returns JSX with highlighted matches
 */
export function highlightText(text: string, searchTerm: string): React.ReactNode {
    if (!searchTerm.trim()) {
        return text
    }

    // Escape special regex characters in the search term
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // Create regex for case-insensitive matching with word boundaries for better matching
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi')

    // Split the text by matches and create elements
    const parts = text.split(regex)

    return parts.map((part, index) => {
        // If the part matches the search term (case-insensitive), highlight it
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
            return (
                <mark
                    key={index}
                    className="bg-gradient-to-r from-red-200 to-red-300 text-red-900 px-1 py-0.5 rounded-sm font-semibold shadow-sm border border-red-400/30"
                >
                    {part}
                </mark>
            )
        }
        return part
    })
}

/**
 * Alternative highlighting function using span with custom class
 * @param text - The text to highlight matches in
 * @param searchTerm - The search term to highlight
 * @returns JSX with highlighted matches using span
 */
export function highlightTextWithSpan(text: string, searchTerm: string): React.ReactNode {
    if (!searchTerm.trim()) {
        return text
    }

    // Escape special regex characters in the search term
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // Create regex for case-insensitive matching
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi')

    // Split the text by matches and create elements
    const parts = text.split(regex)

    return parts.map((part, index) => {
        // If the part matches the search term (case-insensitive), highlight it
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
            return (
                <span
                    key={index}
                    className="bg-gradient-to-r from-red-200 to-red-300 text-red-900 px-1 py-0.5 rounded font-semibold shadow-sm"
                >
                    {part}
                </span>
            )
        }
        return part
    })
}

/**
 * Highlight search terms with a more subtle style for content text
 * @param text - The text to highlight matches in
 * @param searchTerm - The search term to highlight
 * @returns JSX with highlighted matches using a subtle style
 */
export function highlightTextSubtle(text: string, searchTerm: string): React.ReactNode {
    if (!searchTerm.trim()) {
        return text
    }

    // Escape special regex characters in the search term
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // Create regex for case-insensitive matching
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi')

    // Split the text by matches and create elements
    const parts = text.split(regex)

    return parts.map((part, index) => {
        // If the part matches the search term (case-insensitive), highlight it
        if (part.toLowerCase() === searchTerm.toLowerCase()) {
            return (
                <span
                    key={index}
                    className="bg-red-100 text-red-800 px-0.5 py-0.5 rounded-sm font-medium"
                >
                    {part}
                </span>
            )
        }
        return part
    })
}
