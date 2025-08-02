import config from "../config";
import { href } from "./util";

export const link = ({ title, id, category }) => `${config.url}/p/${id}/${href(category)}/${href(title)}`
export const generateLink = ({ title, id, category }) => {
    let text = encodeURIComponent(`Find this amazing product ${title} at Zerroo`)
    let link = encodeURIComponent(`${config.url}/p/${id}/${href(category)}/${href(title)}`)
    let line = encodeURIComponent('\r\n\r\n')
    return { text, link, line }
}
export const whatsapp = item => {
    const { text, link, line } = generateLink(item)
    return `https://wa.me/?text=${text}${line}${link}`
}

export const facebook = item => {
    const { text, link } = generateLink(item)
    return `https://www.facebook.com/sharer/sharer.php?u=${link}&quote=${text}`
}

export const instagram = item => {
    const { text, link } = generateLink(item)
    return `https://www.instagram.com/share?text=${text}\r\n\r\n${link}`
}

export const twitter = item => {
    const { text, link } = generateLink(item)
    return `https://twitter.com/intent/tweet?text=${text}&url=${link}`
}
