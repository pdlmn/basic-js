const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
*/
const chainMaker = {
  head: null,
  tail: null,

  getLength() {
    if (!this.head) return 0

    let length = 0
    let currNode = this.head

    while (currNode) {
      currNode = currNode.next
      length += 1
    }
    return length
  },
  addLink(value) {
    const node = { value, next: null }

    if (!this.head) {
      this.head = node
      this.tail = node
      this.head.prev = null
      return this
    }

    const prevTail = this.tail
    this.tail.next = node
    node.prev = this.tail
    this.tail = node
    return this
  },
  removeLink(position) {
    if (
      position > this.getLength() || 
      position <= 0 || 
      typeof position !== 'number'
    ) {
      this.head = null
      this.tail = null
      throw new Error("You can\'t remove incorrect link!")
    }
    let deletedNode = this.head
    for (let i = 1; i < position; i++) {
      deletedNode = deletedNode.next
    }

    if (deletedNode === this.head) {
      this.head = deletedNode.next

      if (this.head) {
        this.head.prev = null
      }

      return this
    } else if (deletedNode === this.tail) {
      this.tail = deletedNode.prev

      if (this.tail) {
        this.tail.next = null
      }

      return this
    } else if (deletedNode) {
      const prevNode = deletedNode.prev
      const nextNode = deletedNode.next

      prevNode.next = nextNode
      nextNode.prev = prevNode

      return this
    }
    return this
  },
  reverseChain() {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode) {
      nextNode = currNode.next
      prevNode = currNode.prev

      currNode.next = prevNode
      currNode.prev = nextNode

      prevNode = currNode
      currNode = nextNode
    }

    this.tail = this.head
    this.head = prevNode

    return this
  },
  finishChain() {
    let finished = ''
    let currNode = this.head
    while (currNode) {
      finished += `~( ${currNode.value} )~`
      currNode = currNode.next
    }
    this.head = null
    this.tail = null
    return finished.slice(1, -1)
  }
};

// console.log(chainMaker.addLink(1).addLink(2).addLink(3).finishChain())
// console.log(chainMaker.addLink(3).addLink(2).addLink(1).finishChain())

module.exports = {
  chainMaker
};
