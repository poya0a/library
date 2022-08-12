(($)=>{

  let calendar={
    init:function(){
      this.header();
      this.main();
      this.footer();
    },
    header(){

      // 메인 메뉴
      $('.main-menu').on({
        mouseover:function(){
          $('.main-menu').removeClass('on');
          $('.sub, .menu-bg').addClass('show');
          $('.pick').addClass('on');
          $(this).addClass('on');
        },
        focusin:function(){
          $('.main-menu').removeClass('on');
          $('.sub, .menu-bg').addClass('show');
          $('.pick').addClass('on');
          $(this).addClass('on');
        }
      });

      $('.pick').on({
        mouseover:function(){
          $('.main-menu').removeClass('on');
          $('.sub, .menu-bg').addClass('show');
          $(this).addClass('on');
        },
        focusin:function(){
          $('.main-menu').removeClass('on');
          $('.sub, .menu-bg').addClass('show');
          $(this).addClass('on');
        }
      });

      $('#nav').on({
        mouseleave:function(){
          $('.main-menu').removeClass('on');
          $('.pick').removeClass('on');
          $('.sub, .menu-bg').removeClass('show');
        },
        focusout:function(){
          $('.main-menu').removeClass('on');
          $('.pick').removeClass('on');
          $('.sub, .menu-bg').removeClass('show');
        }
      });

      $('.sub').on({
        mouseover:function(){
          $('.main-menu').removeClass('on');
          $(this).prev().addClass('on');
        }
      });

      $('#mainKeyword').on({
        click:function(){
          $('.main-keyword-label').hide();
        }
      });

      $('.arrow-btn').on({
        click:function(){
          $(this).toggleClass('on');
        }
      });

      //메인 메뉴 스크롤 이벤트
      let headerTop=$(window).height()-$('#header').height()-$('.inner-top').height()-$('.sub-menu-bg').height();
      
      $(window).scroll(function(){

        if($(this).scrollTop()>headerTop){
          $('.inner-bottom').addClass('on');
        }
        else{
          $('.inner-bottom').removeClass('on');
      }});

      $('.nav-open-btn').on({
        click:function(){
          $('.nav-close-btn').addClass('on');
          $(this).addClass('on');
          $('.inner-top, .menu-bg, .sub').addClass('on');
        }
      });

      $('.nav-close-btn').on({
        click:function(){
          $('.nav-open-btn').removeClass('on');
          $(this).removeClass('on');
          $('.inner-top, .menu-bg, .sub').removeClass('on');
        }
      });

    },
    main(){

      //메뉴
      $('.menu-lnb-btn').on({
        click:function(e){
          e.preventDefault();
          $('.menu-lnb-btn').removeClass('on');
          $('.sub-lnb').stop().slideUp(300);
          $(this).addClass('on');
          $(this).next().stop().slideToggle(300)
        }
      });


      //서브 메뉴
			$('.sub-menu-closed').on({
				click:function(e){
					e.preventDefault();
					$('.sub-menu-item, .calendar').removeClass('selected');
          $(this).addClass('selected');
					$('#calendar1').addClass('selected');
					$('.closed, .closed-temporary').show();
					$('.educate').hide();
          closedDay();
				}
			});

			$('.sub-menu-educate1').on({
				click:function(e){
					e.preventDefault();
					$('.sub-menu-item, .calendar').removeClass('selected');
          $(this).addClass('selected');
					$('#calendar2').addClass('selected');
					$('.closed, .closed-temporary').hide();
					$('.educate').show().text('전시');
				}
			});

			$('.sub-menu-educate2').on({
				click:function(e){
					e.preventDefault();
					$('.sub-menu-item, .calendar').removeClass('selected');
          $(this).addClass('selected');
					$('#calendar3').addClass('selected');
					$('.closed, .closed-temporary').hide();
					$('.educate').show().text('교육 (정보활용능력교육, 강연세미나)');
				}
			});

      //달력
			let date=new Date();
			let today=new Date();
      let nowYear=new Date().getFullYear();
      let nowMonth=new Date().getMonth()+1;

			//월 검색
			$('#inputDate').attr('placeholder',nowYear+'-'+('0'+nowMonth).slice(-2));

			$('#scheduleSearch').on({
				click:function(e){
          e.preventDefault();
					let inputDateVal=$('#inputDate').val();
				  let regExp=/^\d{4}-\d{2}$/;
					let searchDate=inputDateVal.split('-');

					if(!regExp.test(inputDateVal)){
						alert("YYYY-MM 형식으로 입력하시기 바랍니다.");
						return false;
					}
					else {
						if(searchDate[1] > 12 || searchDate[1] <= 0){
								alert("01월 ~ 12월 까지만 입력해주시기 바랍니다.");
								return false;
						}
					   else {
             $('.calendar > tr').remove();
             $('.calendar > td').remove();
             today=new Date(new Date(inputDateVal.substr(0,4)).getFullYear(),new Date(inputDateVal.substr(5,2)).getMonth(),today.getDate());
             Calendarfn();
					   }
					}
				}
			});

      $('.prev-month-btn').on({
        click:function(){
          $('.calendar tr, .calendar td').remove();
          today=new Date(today.getFullYear(),today.getMonth()-1,today.getDate());
          Calendarfn();
        }
      });

      $('.next-month-btn').on({
        click:function(){
          $('.calendar tr, .calendar td').remove();
          today=new Date(today.getFullYear(),today.getMonth()+1,today.getDate());
          Calendarfn();
        }
      });

      function Calendarfn(){
          
          year=today.getFullYear();
          month=today.getMonth();
          firstDay=new Date(year,month,1).getDay();
          lastDate=new Date(year,month+1,0).getDate();

          $('.month').text(year+'년'+'\u00a0'+('0'+(month+1)).slice(-2)+'월');

          if((year%4===0&&year%100!==0) || year%400===0) {
              lastDate[1]=29;
          }

          for (i=0; i<firstDay; i++){
              $('.calendar').append('<td><div></div></td>');
          }

          for (i=1; i<=lastDate; i++){
            
              plusDate=new Date(year,month,i).getDay();
              week=['sun','mon','tue','wed','thu','fri','sat'];
              dayOfWeek=week[plusDate];

              if (plusDate==0){
                  $('.calendar').append('<tr></tr>');
              }
              $('.calendar').append('<td id="dispDay"><div id="day" class="'+dayOfWeek+'"><strong>'+i+'</strong><span class="text"></span></div></td>');

              $('.calendar #dispDay .mon').eq(1).addClass('closed');
              $('.calendar #dispDay .mon').eq(3).addClass('closed');
              $('.calendar #dispDay .closed .text').text('정기휴관일');
          }

          if($('.calendar td').length%7!=0){
              for(i=1; i<= $('.calendar > td').length%7; i++){
                  $('.calendar').append('<td></td>');
              }
          }
      }

      Calendarfn();

      //정기휴관일,공휴일
      // function closedDay(){
        
      // }

      // //전시
      // function educate1Day(){
      //   educate1Array1=[
      //     {year:'2020',month:'10',date:'13',title:'기증인이 직접 쓴 기증이야기'},
      //     {year:'2021',month:'02',date:'15',title:'책에서 피어난 그림, 책거리'},
      //     {year:'2021',month:'03',date:'24',title:'지식의 역사를 잇다'},
      //     {year:'2021',month:'04',date:'27',title:'미래 도서관 특별전'},
      //     {year:'2021',month:'06',date:'28',title:'크로아티아 천년의 발자취, 중세부터 현대까지 문학 및 문화 유산'},
      //     {year:'2021',month:'09',date:'23',title:'근대, 그 시절 여성과 청년을 읽다'},
      //     {year:'2021',month:'12',date:'06',title:'원당 심우준 교수 기증전: 스승의 뜻, 아름다운 공유'},
      //     {year:'2022',month:'03',date:'14',title:'에스토니아, 라트비아, 리투아니아 - 미래로 나아가는 발트의 길'},
      //     {year:'2022',month:'04',date:'26',title:'그대, 내게 꽃이 되어'}
      //   ]
      //   educate1Array2=[
      //     {year:'2020',month:'10',date:'13',EYear:'2021',EMonth:'03',EDate:'21',title:'기증인이 직접 쓴 기증이야기'},
      //     {year:'2021',month:'02',date:'15',EYear:'2021',EMonth:'04',EDate:'09',title:'책에서 피어난 그림, 책거리'},
      //     {year:'2021',month:'03',date:'24',EYear:'2021',EMonth:'12',EDate:'26',title:'지식의 역사를 잇다'},
      //     {year:'2021',month:'04',date:'27',EYear:'2021',EMonth:'05',EDate:'31',title:'미래 도서관 특별전'},
      //     {year:'2021',month:'06',date:'28',EYear:'2021',EMonth:'07',EDate:'25',title:'크로아티아 천년의 발자취, 중세부터 현대까지 문학 및 문화 유산'},
      //     {year:'2021',month:'09',date:'23',EYear:'2021',EMonth:'11',EDate:'21',title:'근대, 그 시절 여성과 청년을 읽다'},
      //     {year:'2021',month:'12',date:'06',EYear:'2022',EMonth:'02',EDate:'27',title:'원당 심우준 교수 기증전: 스승의 뜻, 아름다운 공유'},
      //     {year:'2022',month:'03',date:'14',EYear:'2022',EMonth:'04',EDate:'10',title:'에스토니아, 라트비아, 리투아니아 - 미래로 나아가는 발트의 길'},
      //     {year:'2022',month:'04',date:'26',EYear:'2022',EMonth:'07',EDate:'03',title:'그대, 내게 꽃이 되어'}
      //   ]

      //   for (i=0; i<=educate1Array1.length; i++){
      //     date=new Date();

      //     if(i.year==date.getFullYear()&&i.month==date.getMonth()&&i.date==date.getDate()){
      //         $('.calendar #dispDay #day').eq(i).addClass('educate1'); 
      //         $('.calendar #dispDay #day strong .text').eq(i).text(i.title);
      //     }
      //   }


      // }

      // //교육
      // function educate2Day(){
      //   educate2Array1=[
      //     {year:'2022',month:'04',date:'04',title:'2022년 제1회 「저자와의 만남」 강연 안내'},
      //     {year:'2022',month:'04',date:'21',title:'구독 전자자원 활용 교육'},
      //     {year:'2022',month:'05',date:'07',title:'[온라인 교육] 청년 직장인을 위한 디지털 마케팅 아카데미'},
      //     {year:'2022',month:'05',date:'09',title:'2022 디지털 트렌드'},
      //     {year:'2022',month:'05',date:'31',title:'[행사] 시인의 초대, 다방에서 꽃시 한잔'},
      //     {year:'2022',month:'06',date:'08',title:'[온라인 교육] 학부모를 위한 미디어 리터러시 아카데미'},
      //     {year:'2022',month:'06',date:'10',title:'2022년 ‘나의 책, 나의 인문기행’ 인문학 명사특강'},
      //     {year:'2022',month:'06',date:'22',title:'[접수마감] 연구지원을 위한 텍스트마이닝 활용법 교육생 모집 안내'},
      //     {year:'2022',month:'06',date:'27',title:'[온라인 교육] 청년을 위한 디지털 기업가정신 아카데미'},
      //     {year:'2022',month:'07',date:'02',title:'[대면교육] 중견 직장인을 위한 빅데이터 아카데미'}
      //   ]
      //   educate2Array2=[
      //     {year:'2022',month:'04',date:'04',EMonth:'04',EDate:'12',title:'2022년 제1회 「저자와의 만남」 강연 안내'},
      //     {year:'2022',month:'04',date:'21',EMonth:'05',EDate:'13',title:'구독 전자자원 활용 교육'},
      //     {year:'2022',month:'05',date:'07',EMonth:'05',EDate:'28',title:'[온라인 교육] 청년 직장인을 위한 디지털 마케팅 아카데미'},
      //     {year:'2022',month:'05',date:'09',EMonth:'05',EDate:'30',title:'2022 디지털 트렌드'},
      //     {year:'2022',month:'05',date:'31',EMonth:'06',EDate:'08',title:'[행사] 시인의 초대, 다방에서 꽃시 한잔'},
      //     {year:'2022',month:'06',date:'08',EMonth:'06',EDate:'17',title:'[온라인 교육] 학부모를 위한 미디어 리터러시 아카데미'},
      //     {year:'2022',month:'06',date:'10',EMonth:'06',EDate:'20',title:'2022년 ‘나의 책, 나의 인문기행’ 인문학 명사특강'},
      //     {year:'2022',month:'06',date:'22',EMonth:'06',EDate:'24',title:'[접수마감] 연구지원을 위한 텍스트마이닝 활용법 교육생 모집 안내'},
      //     {year:'2022',month:'06',date:'27',EMonth:'07',EDate:'13',title:'[온라인 교육] 청년을 위한 디지털 기업가정신 아카데미'},
      //     {year:'2022',month:'07',date:'02',EMonth:'07',EDate:'23',title:'[대면교육] 중견 직장인을 위한 빅데이터 아카데미'}
      //   ]

      //   for (i=0; i<=educate2Array1.length; i++){
      //     educate2Year=new Date(i.year).getFullYear();
      //     educate2Month=new Date(i.month).getMonth();
      //     educate2Date=new Date(i.date).getDate();

      //     $(".date").each(function(i){
      //       if(educate2Year==date.getFullYear()&&educate2Month==date.getMonth()&&educate2Date==date.getDate()){
      //           $('.calendar #dispDay #day').eq(i).addClass('educate2'); 
      //           $('.calendar #dispDay #day strong .text').eq(i).text(i.title);
      //       }
      //     });
      //   }
      // }

    },

    footer(){

      //유관사이트
      $('#familySiteBtn').on({
        click:function(){
          if($('#familySite').val()!==''){
          window.open($('#familySite').val());
        }}
      });

			//퀵 메뉴
			$('.quick-open-btn').on({
				click:function(){
					$('.quick-open-btn').hide();
					$('.quick-close-btn').show();
					$('.quick-menu-box').addClass('on');
				}
			});
			
			$('.quick-close-btn').on({
				click:function(){
					$('.quick-close-btn').hide();
					$('.quick-open-btn').show();
					$('.quick-menu-box').removeClass('on');
				}
			});

      // 위로 바로가기 버튼
      const footerTop=$('#footer').offset().top-$(window).height(); 

      $(window).scroll(function(){

        if($(this).scrollTop()>footerTop){
          $('#fixedBtnWrap').fadeIn();
        }
        else{
          $('#fixedBtnWrap').fadeOut();
      }});

      $('#fixedBtnWrap').click(function(){
          $('body,html').animate({scrollTop:0},300);
          return false; 
      });

    }
  }

  calendar.init();
  
})(jQuery);