import { test, describe } from "node:test"
import assert from "node:assert"
import listHelper from "../utils/list_helper.js"

test("dummy returns one", () => {
  const blogs = []
  assert.strictEqual(listHelper.dummy(blogs), 1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const biggerList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f7',
    title: 'Use console.log more',
    author: 'full stack open',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 6,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f6',
    title: 'Open console on browser',
    author: 'full stack open',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 7,
    __v: 0
  }
]

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(biggerList)
    assert.strictEqual(result, 18)
  })
})

describe("favorite blog", () => {
  test("of empty list is {}", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), {})
  })

  test("when list has only one blog, return this blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test("of a bigger list, return most the blog with most likes", () => {
    const result = listHelper.favoriteBlog(biggerList)
    assert.deepStrictEqual(result, biggerList[2])
  })
})

describe("most blogs", () => {
  test("of empty list is {}", () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), {})
  })

  test("when list has only one blog, return this blog's author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {author: listWithOneBlog[0].author, blogs: 1})
  })

  test("return the author with largest amount of blogs", () => {
    const result = listHelper.mostBlogs(biggerList)
    assert.deepStrictEqual(result, {author: "full stack open", blogs: 2})
  })
})

describe("most blogs", () => {
  test("of empty list is {}", () => {
    assert.deepStrictEqual(listHelper.mostLikes([]), {})
  })

  test("when list has only one blog, return this blog's author", () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {author: listWithOneBlog[0].author, likes: 5})
  })

  test("return the author with largest amount of blogs", () => {
    const result = listHelper.mostLikes(biggerList)
    assert.deepStrictEqual(result, { author: 'full stack open', likes: 13 })
  })
})