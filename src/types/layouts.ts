import { ArticleType } from "./article"

export type ModuleType = {
    id: string,
    layout_id: string
    type: string
    module_order: number,
    config: ModuleConfig
}

export type ModuleConfig = {
    slots: (string | null)[],
    orientation?: Orientation
    count?: number,
    show_image?: boolean
}

// [index, article] to be passed into rows and column displays
export type ItemType = {
    index: number,
    article: ArticleType | null
}

// placement of image relative to text within a row or column
export type Orientation = "vertical" | "horizontal"