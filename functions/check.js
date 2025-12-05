const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
  const username = event.queryStringParameters.username;

  if (!username) {
    return { statusCode: 400, body: JSON.stringify({ error: "Username required" }) };
  }

  try {
    const profileRes = await fetch(`https://www.threads.net/@${username}`);
if (profileRes.status === 404) {
    return { statusCode: 200, body: JSON.stringify({ status: "not_found" }) };
} else {
    return { statusCode: 200, body: JSON.stringify({ status: "normal" }) };
}


    const searchRes = await fetch(`https://www.threads.net/api/search?query=${username}`);
    const visible = searchRes.status === 200;

    return {
      statusCode: 200,
      body: JSON.stringify({
        user: username,
        profile_exists: true,
        search_visible: visible,
        status: visible ? "normal" : "possibly_shadowbanned"
      })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch data." }) };
  }
};

