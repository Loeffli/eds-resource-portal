import { addAnchorLink } from '../../scripts/scripts.js';

function autoLink(string) {
  const pattern = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?):\/\/[-A-Z0-9+\u0026\u2019@#/%?=()~_|!:,.;]*[-A-Z0-9+\u0026@#/%=~()_|])/gi;
  return string.replace(pattern, '$1<a href="$2">$2</a>');
}

export default async function decorateFaq($block) {
  const source = new URL($block.querySelector('a').href).pathname;
  const resp = await fetch(source);
  const json = await resp.json();
  $block.innerText = '';
  const $tileWrapper = document.createElement('div');
  $tileWrapper.classList.add('tiles-wrapper');

  console.log(json);

  json.data.forEach((row, i) => {
    const $tile = document.createElement('div');
    $tile.classList.add('resource-tile');
    $tile.id = `q${(i + 1)}`;

    //title
    const $title = document.createElement('h1');
    $title.innerText = row.Title;

    //description
    const $description = document.createElement('div');
    $description.classList.add('tile-description');
    $description.innerHTML = row.Description;

    $description.innerHTML = $description.innerHTML + "<br>" + row.Link + "<br>" + row.LastVerification + "<br>" + row.Audience;

    $tile.append($title, $description);

    $tileWrapper.append($tile);
  });
  $block.append($tileWrapper);

  const selected = document.getElementById(window.location.hash.slice(1));
  if (selected) {
    selected.scrollIntoView();
  }
}
