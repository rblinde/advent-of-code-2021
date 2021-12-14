class Graph {
  constructor(lines) {
    this.graph = {};

    for (const line of lines) {
      this.route(...line.split('-'));
    }
  }


  get(start = null) {
    if (!start) {
      return this.graph;
    }

    return this.graph[start];
  }


  route(a, b) {
    this.graph[a] = this.graph[a] ? this.graph[a] : [];
    this.graph[b] = this.graph[b] ? this.graph[b] : [];
    this.graph[a].push(b);
    this.graph[b].push(a);
  }
}


const isLow = str => str === str.toLowerCase();


const findPaths = (start, end, route, graph, routes) => {
  if (start === end) {
    return routes.add(route.join(','));
  }

  for (const option of graph.get(start)) {
    if (option === 'start' || (isLow(option) && route.includes(option))) {
      continue;
    }

    findPaths(option, end, [...route, option], graph, routes);
  }
};


const findMorePaths = (start, end, route, graph, routes) => {
  if (start === end) {
    return routes.add(route.join(','));
  }

  for (const option of graph.get(start)) {
    if (option === 'start') {
      continue;
    }

    if (isLow(option)) {
      const smallCaves = route.filter(e => e !== 'start' && isLow(e));
      const map = {};

      for (const cave of smallCaves) {
        map[cave] = map[cave] ? map[cave] + 1 : 1;
      }

      const values = Object.values(map);
      const two = values.filter(e => e === 2).length;
      const val = map[option] || 0;
      const canEnter = val < 2 && two < 2;

      if (!canEnter) {
        continue;
      }
    }

    findMorePaths(option, end, [...route, option], graph, routes);
  }
};


const partOne = (input) => {
  const lines = input.split('\n');
  const graph = new Graph(lines);
  const routes = new Set();
  findPaths('start', 'end', ['start'], graph, routes);
  return routes.size;
};


const partTwo = (input) => {
  const lines = input.split('\n');
  const graph = new Graph(lines);
  const routes = new Set();
  findMorePaths('start', 'end', ['start'], graph, routes);
  return routes.size;
};


export default { partOne, partTwo };
