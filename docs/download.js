 // Get session_id from URL
 const params = new URLSearchParams(window.location.search);
 const sessionId = params.get('session_id');

 if (sessionId) {
   fetch(`https://fallinorg-download.roccemagneta.workers.dev/get-download?session_id=${sessionId}`)
     .then(res => res.json())
     .then(data => {
       if (data.url) {
         document.getElementById('download-link').href = data.url;
         document.getElementById('download-link').style.display = 'inline-block';
         document.getElementById('status').style.display = 'none';
       } else {
         document.getElementById('status').textContent = 'Unable to verify payment.';
       }
     })
     .catch(err => {
       document.getElementById('status').textContent = 'Error verifying payment.';
       console.error(err);
     });
 } else {
   document.getElementById('status').textContent = 'No session found.';
 }