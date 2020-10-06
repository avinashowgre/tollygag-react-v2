import dummyjson from "dummy-json";

export function postsDummyResponse(responseLen: number = 3) {
  const author = `{
    "headline": "{{lorem min=1 max=10}}",
    "id": {{int 1 100}},
    "image": {
      "url": "/assets/img{{@index}}.jpg",
      "meta": {{> metadata}}
    },
    "name": "{{firstName}} {{lastName}}"
  }`;

  const content = `{
    "meta": {{> metadata}},
    "source": "{{lorem min=1 max=5}}",
    "subType": "{{lorem min=1 max=5}}",
    "type": "{{lorem min=1 max=5}}",
    "url": "/assets/img{{@index}}.jpg"
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
