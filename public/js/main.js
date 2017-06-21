(function() {
  'use strict';

  // ↓ ソート機能

  var ths = document.getElementsByTagName('th');
  var sortOrder = 1; // 1: 昇順、2: 降順

  function sortRows(th) {
  	var rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr')); // NodeList
		var col = th.cellIndex;
		var type = th.dataset.type; // string, number, comment
		rows.sort(function(a, b){ // tr, tr
			return compare(a, b, col, type) * sortOrder;
		});
		return rows;
  }

  function compare(a, b, col, type) {
  	var _a = a.children[col].textContent;
  	var _b = b.children[col].textContent;
  	if (type === "number") {
		  _a *= 1;
		  _b *= 1;
		}
		if (type === "string") {
		  _a = _a.toLowerCase();
		  _b = _b.toLowerCase();
		}
		if (type === "comment") {
			return;
		}
		if (_a < _b) {
			return -1;
		}
		if (_a > _b) {
			return 1;
		}
		return 0;
  }

  function rebuildTbody(rows) {
  	var tbody = document.querySelector('tbody');
  	var i;
		while (tbody.firstChild) {
			tbody.removeChild(tbody.firstChild);
		}
		for (i = 0; i < rows.length; i++) {
			tbody.appendChild(rows[i]);
		}
  }

  function updateClassName(th) {
		var k;
		for (k = 0; k < ths.length; k++) {
			ths[k].className = '';
		}
		th.className = sortOrder === 1 ? 'asc' : 'desc';
  }

  function setup() {
  	var i;
	  for (i = 0; i < ths.length; i++) {
	  	ths[i].addEventListener('click', function() {
	  		var rows;
	  		rows = sortRows(this);

	  		rebuildTbody(rows);

	  		updateClassName(this);

	  		sortOrder *= -1;
	  	});
	  }
  }

  setup();

  // ↑ ソート機能

  // ↓ モーダル機能

  var openNew = document.getElementById('open-new');
  var closeNew = document.getElementById('close-new');
  var modalNew = document.getElementById('modal-new');

  // var openUpdate = document.getElementById('open-update');
  var closeUpdate = document.getElementById('close-update');
  var modalUpdate = document.getElementById('modal-update');

  var mask = document.getElementById('mask');

  openNew.addEventListener('click', function(){
  	modalNew.className = '';
  	mask.className = '';
  });
  // openUpdate.addEventListener('click', function(){
  // 	modalUpdate.className = '';
  // 	mask.className = '';
  // });

  closeNew.addEventListener('click', function(){
  	modalNew.className = 'hidden';
  	mask.className = 'hidden';
  });
  closeUpdate.addEventListener('click', function(){
  	modalUpdate.className = 'hidden';
  	mask.className = 'hidden';
  });

  mask.addEventListener('click', function(){
  	closeNew.click();
  	closeUpdate.click();
  });
})();









