/* BudgetWise Data Structures & Search Algorithms Module */

/**
 * High-performance Priority Queue (MinHeap / MaxHeap)
 */
export class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.comparator = comparator;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    return this.heap[0] || null;
  }

  push(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) return null;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._sinkDown(0);
    }
    return top;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIdx]) < 0) {
        [this.heap[index], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[index]];
        index = parentIdx;
      } else {
        break;
      }
    }
  }

  _sinkDown(index) {
    const length = this.heap.length;
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let swapIdx = null;

      if (leftChildIdx < length) {
        if (this.comparator(this.heap[leftChildIdx], this.heap[index]) < 0) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        if (
          (swapIdx === null && this.comparator(this.heap[rightChildIdx], this.heap[index]) < 0) ||
          (swapIdx !== null && this.comparator(this.heap[rightChildIdx], this.heap[leftChildIdx]) < 0)
        ) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === null) break;
      [this.heap[index], this.heap[swapIdx]] = [this.heap[swapIdx], this.heap[index]];
      index = swapIdx;
    }
  }
}

/**
 * Trie node for autocomplete search indexing
 */
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.data = [];
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, itemData = null) {
    if (!word) return;
    let node = this.root;
    const cleanWord = word.toLowerCase();

    for (const char of cleanWord) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
    if (itemData) node.data.push(itemData);
  }

  searchPrefix(prefix) {
    if (!prefix) return [];
    let node = this.root;
    const cleanPrefix = prefix.toLowerCase();

    for (const char of cleanPrefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }

    const results = [];
    this._collectAllWords(node, results);
    return results;
  }

  _collectAllWords(node, results) {
    if (node.isEndOfWord) {
      results.push(...node.data);
    }
    for (const char in node.children) {
      this._collectAllWords(node.children[char], results);
    }
  }
}

/**
 * LRU (Least Recently Used) Cache Memory Store
 */
export class LRUCache {
  constructor(capacity = 50) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  clear() {
    this.cache.clear();
  }
}
