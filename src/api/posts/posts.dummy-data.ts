import dummyjson from "dummy-json";

export function postsDummyResponse(responseLen: number = 3) {
  const author = `{
    "headline": "{{lorem min=1 max=10}}",
    "id": {{int 1 100}},
    "image": {
      "url": "https://i.pinimg.com/originals/50/c8/14/50c81499ee1398f5108fe6580887879b.jpg",
      "meta": {{> metadata}}
    },
    "name": "{{firstName}} {{lastName}}"
  }`;

  const content = `{
    "meta": {{> metadata}},
    "source": "{{lorem min=1 max=5}}",
    "subType": "{{lorem min=1 max=5}}",
    "type": "{{lorem min=1 max=5}}",
    "url": "https://media0.giphy.com/media/HoZ4p20ix5h8A/giphy.gif?cid=ecf05e4729280bf576cbeb19aa461af57bd91d780b20b90c&rid=giphy.gif"
  }`;

  const metadata = `{
    "size": {
      "width": {{int 1000 2000}},
      "height": {{int 1000 2000}}
    }
  }`;

  const socialStats = `{
    "comments": {{int 1000 2000}},
    "downvotes": {{int 1000 2000}},
    "upvotes": {{int 1000 2000}}
  }`;

  const myPartials = { author, content, metadata, socialStats };

  const template = `{
    "items": [
      {{#repeat ${responseLen}}}
      {
        "author": {{> author}},
        "body": "{{lorem min=10 max=20}}",
        "content": {{> content}},
        "createdAt": "{{date '2000' '2020' 'unix'}}",
        "id": {{int 100 200}},
        "socialStats": {{> socialStats}},
        "title": "{{lorem min=1 max=5}}",
        "type": "gag"
      }
      {{/repeat}}
    ]
  }`;

  return JSON.parse(dummyjson.parse(template, { partials: myPartials }));
}
