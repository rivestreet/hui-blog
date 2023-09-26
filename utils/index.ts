import {format, parseISO} from 'date-fns'

/**
 * 格式化日期
 * @param date 2020-01-01T00:00:00.000Z
 * @returns Jan 01, 2020
 */
export function formattedDate(date: string) {
    if (!date) return ''
    const dateObject = parseISO(date)
    return format(dateObject, 'MMM dd, yyyy')
}


/**
 * 格式化日期
 * @param posts 文章列表
 * @returns 带年份的文章列表
 */
export function insertYearToPosts(posts: any) {
    let currentYear = -1
    return posts.reduce(
        (posts: any, post: any) => {
            const year = new Date(post.date).getFullYear()
            if (year !== currentYear && !isNaN(year)) {
                posts.push({
                    isMarked: true,
                    year,
                })
                currentYear = year
            }
            posts.push(post)
            return posts
        },
        [],
    )
}

/**
 * 获取指定目录下的所有文章
 * @param dirName 目录名
 * @returns 文章列表
 * */
export async function getIncludedYearPosts(dirName: string) {
    const result = await queryContent(dirName).sort({date: -1}).find()
    return insertYearToPosts(result)
}
