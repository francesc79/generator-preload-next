const fetchStarWars = async id => {
  const response = await fetch(
    `https://starwars.egghead.training/people/${id}`
  );
  return await response.json();
};

async function* preloadIterator(array) {
  let i = 0;
  let next;
  let current;
  console.log(i, array.length);
  while (i <= array.length) {
    current = next ? await next : await fetchStarWars(i);
    next = fetchStarWars(++i);
    yield current;
  }

  return;
}

const button = document.createElement("button");
button.innerText = "Load Character";
document.body.appendChild(button);

const span = document.createElement("span");
document.body.appendChild(span);

const iterator = preloadIterator([0, 1, 2, 3]);

button.addEventListener("click", async event => {
  const { value: character } = await iterator.next();
  console.log(character);
  span.innerText = character.name;
});
