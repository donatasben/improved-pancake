$(function(){

  // Get Beer data & print HTML
  $.ajax({
    url: "/beer",
    dataType: "json",
    headers: {Authorization: "VerySecretToken"}
  })
    .done(function( data ) {
      //console.log( data );
      $.each( data.items, function( i, item ) {
        let beer = `
      		<div class="beer-pic beer-pic--empty beer-pic--${item.color}">
						<div class="beer-pic__bubbles"></div>
						<div class="beer-pic__handle"></div>
      		</div>
      		<h2>${item.name}</h2> 
          <div class="beer-data">
            <div class="beer-data__row beer-data--bitterness">
              <div class="beer-data__label">Kartumas</div>
              <div class="beer-data__value">${item.bitterness}</div>
            </div>
            <div class="beer-data__row beer-data--alc">
              <div class="beer-data__label">Stiprumas</div>
              <div class="beer-data__value">${item.alc}</div>
            </div>
            <div class="beer-data__row beer-data--color">
              <div class="beer-data__label">Spalva</div>
              <div class="beer-data__value">${item.color}</div>
            </div>
          </div>`;

        $( `<li class="beer" data-id="${item.id}" 
                data-bitterness="${item.bitterness}" 
                data-alc="${item.alc}" 
                data-color="${item.color}">` )
          .html( beer ).appendTo( ".beers-list" );
      });

	    // Init MixitUp plugin for sorting
	    var mixer = mixitup('.beers-list', {
	      selectors: {
	        target: '.beer',
	        control: '.sort-btns__btn',
	      },
	      controls: {
	        live: true
	      },
	      debug: {
		      enable: true
		    },
	      animation: {
	        duration: 500,
	        nudge: true,
	        reverseOut: false,
	        effects: "fade translateZ(-100px) stagger(75ms) skewX(10deg)"
	      },
	      callbacks: {
	      	onMixStart: function() {
	      		// Clear class names on sorting start
	      		$('.beers-list').attr('class','beers-list');
	      	},
					onMixEnd: function(state) {
						// Add class to highlight active sorting value in beer list
						$('.beers-list').addClass('js-beer-sort--'+state.activeSort.attribute);
	          console.log('Sorting by '+state.activeSort.attribute);
	        }
	      }
	    });

	    var fillBeer = window.setTimeout(function(){
	    	$('.beer-pic').removeClass('beer-pic--empty');
	    }, 200);

			//console.log(mixer);
    });




});