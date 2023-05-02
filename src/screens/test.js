function generateRandomGraphData(length) {
    return Array<number>(length)
      .fill(0)
      .map((_, index) => ({
        date: new Date(
          new Date(2000, 0, 1).getTime() + 1000 * 60 * 60 * 24 * index
        ),
        value: weightedRandom(10, Math.pow(index + 1, 2)),
      }))
  }

  console.log(generateRandomGraphData(10))