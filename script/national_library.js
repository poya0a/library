(function($){

  var library={
    init:function(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.footer();
    },
    header:function(){

      //팝업창
      $('#popup').hide();

      function popupOpen(){
        const result = getCookie('popup_close_jQuery_event');
        
        if(result==='no'){
          $('#popup').hide();
        }
        else{
          $('#popup').show();
        }
      }
      popupOpen();
  
  
      function getCookie(name){
        let tem = [];
        let obj = [];
        let found = '';
      
        tem = document.cookie.split(';'); 
        tem.map(function(item, idx){
          obj[idx] = {
              name: item.split('=')[0].trim(), 
              value: item.split('=')[1].trim() 
          }
        });
      
        obj.map(function(item,idx){
           if(item.name===name){
              found = item.value;
           } 
        })
        return found;
      }
  
      $('.pop-close-btn').on({
        click:function(e){
          e.preventDefault();
      
          $('#popup').hide();

          if($('#popCheckBox').is(':checked')){

            function setCookie(name, value, expires){
              let newDate = new Date();
              newDate.setDate( newDate.getDate() + expires);
              document.cookie = `${name}=${value};path=/;expires=${expires};`;
            }
            
            setCookie('popup_close_jQuery_event', 'no', 1);
          }
        }
      });

      //아날로그 시계
      const deg=6;

      let month=new Date().getMonth()+1;
      let date=new Date().getDate();

      setInterval (()=> {
        let hour=new Date().getHours()*30;
        let minutes=new Date().getMinutes()*deg;

        $('.clock-hour').css('transform','rotateZ('+(hour+minutes/12)+'deg)');
        $('.clock-min').css('transform','rotateZ('+(minutes)+'deg)');
      });

      //날짜
      $('.month-date').text(('0'+month).slice(-2)+'월'+'\u00a0'+('0'+date).slice(-2)+'일');

      
      // 메인 메뉴
      $('.main-menu').on({
        mouseover:function(){
          $('.main-menu').removeClass('on');
          $('.sub').stop().slideDown(30);
          $('.menu-bg').stop().slideDown(30);
          $(this).addClass('on');
        },
        focusin:function(){
          $('.main-menu').removeClass('on');
          $('.sub').stop().slideDown(30);
          $('.menu-bg').stop().slideDown(30);
          $(this).addClass('on');
        }
      });

      $('#nav').on({
        mouseleave:function(){
          $('.main-menu').removeClass('on');
          $('.sub').stop().slideUp(0);
          $('.menu-bg').stop().slideUp(0);
        },
        focusout:function(){
          $('.main-menu').removeClass('on');
          $('.sub').stop().slideUp(0);
          $('.menu-bg').stop().slideUp(0);
        }
      });

      $('.sub').on({
        mouseover:function(){
          $('.main-menu').removeClass('on');
          $(this).prev().addClass('on');
        }
      });

      //메인 메뉴 스크롤 이벤트
      let headerTop=$(window).height()-$('#header').height()-$('#popup').height();

      $(window).scroll(function(){

        if($(this).scrollTop()>headerTop){
          $('.inner-bottom').addClass('on');
        }
        else{
          $('.inner-bottom').removeClass('on');
      }});

    },

    section1:function(){},
    section2:function(){},
    section3:function(){

      // 관내 사이트
      $('.type1').on({
        click:function(e){
          e.preventDefault();
          $('#tabpanel1').show();
          $('#tabpanel2, #tabpanel3').hide();
          $(this).removeClass('off');
          $('.type2, .type3').addClass('off');
        }
      });
      $('.type2').on({
        click:function(e){
          e.preventDefault();
          $('#tabpanel2').show();
          $('#tabpanel1, #tabpanel3').hide();
          $(this).removeClass('off');
          $('.type1, .type3').addClass('off');
        }
      });
      $('.type3').on({
        click:function(e){
          e.preventDefault();
          $('#tabpanel3').show();
          $('#tabpanel1, #tabpanel2').hide();
          $(this).removeClass('off');
          $('.type1, .type2').addClass('off');
        }
      });

      $('#toggleBtn').on({
        click:function(){
          $('#section3').toggleClass('off');
          $('.type-service').toggleClass('off');
        }
      });
      
    },
    section4:function(){

      //달력
      const calender = {
          init: function(){
            this.mainCalender();
          },
          mainCalender: function(){
              let nowYear=new Date().getFullYear();
              let nowMonth=new Date().getMonth()+1;
              let today=new Date();
        
              //도서관 일정
              $('.month').text(nowYear+'년'+'\u00a0'+('0'+nowMonth).slice(-2)+'월');
        
              $('.controller-prev-btn').on({
                click:function(){
                  $('.calendar td').remove();
                  today=new Date(today.getFullYear(),today.getMonth(),today.getDate()-7);
                  Calendarfn();
                }
              });
              $('.controller-next-btn').on({
                click:function(){
                  $('.calendar td').remove();
                  today=new Date(today.getFullYear(),today.getMonth(),today.getDate()+7);
                  Calendarfn();
                }
              });
        
              function Calendarfn(){
                  
                year=today.getFullYear();
                month=today.getMonth();
                date=today.getDate();
                day=today.getDay();
                lastDate=new Date(year,month+1,0).getDate();
                thisWeek=[];
        
                $('.month').text(year+'년'+'\u00a0'+('0'+(month+1)).slice(-2)+'월');
        
                if((year%4===0&&year%100!==0) || year%400===0) {
                    lastDate[1]=29;
                }
        
                for (i=0; i<7; i++){
                    plusDate=new Date(year,month,i).getDay();
                    resultDay=new Date(year,month,date+(i-day));
                    dd=resultDay.getDate();
                    week=['sun','mon','tue','wed','thu','fri','sat'];
                    dayOfWeek=week[i];
                    thisWeek[i]=dd;
                    $('.calendar tr').append('<td id="dispDay"><div id="day" class="'+dayOfWeek+'"><strong>'+thisWeek[i]+'</strong></div></td>');
        
                  for(j=1; j<=lastDate; j++){
                    dayOfWeek=week[j];
                    if(j==='mon'){
                      $('.calendar #dispDay .mon').eq(1).addClass('closed');
                      $('.calendar #dispDay .mon').eq(3).addClass('closed');
                    }
                  }
                }
              }
              Calendarfn();
          }
      }
      calender.init();




      //슬라이드1
      const slide1 = {
          init: function(){
            this.mainSlide();
          },
          mainSlide: function(){
              let cnt=0;
   

              //신청참여 슬라이드
              function slickSlide(){
                $('.slick-track').stop().animate({left:-309*cnt},800,function(){
                    cnt>7?cnt=0:cnt;
                    cnt<0?cnt=7:cnt;
                    $('.slick-track').stop().animate({left:-309*cnt},0)
                });
                numberCount();
              }

              function nextCount(){   
                cnt++;
                slickSlide();
                }
              
                function prevCount(){ 
                cnt--;
                slickSlide();
              }

              function numberCount(){
                $('.slick-choice').removeClass('on');
                $('.slick-choice').eq(cnt>7?cnt=0:cnt).addClass('on');
              }
              
              $('.slick-next-btn').on({
                click:function(){
                  nextCount();
                }
              });

              $('.slick-prev-btn').on({
                click:function(){
                  prevCount();
                }
              });

          }
      }
      slide1.init();


      //슬라이드2
      const slide2 = {
        init: function(){
          this.mainSlide();
        },
        mainSlide: function(){
          let cnt=0;
          let setId=null;
          let setId2=null;

            //소식알림 슬라이드
            function informSlide(){
              $('.inform-wrap').stop().animate({left:-295*cnt},800,function(){
                cnt>7?cnt=0:cnt;
                $('.inform-wrap').stop().animate({left:-295*cnt},0)
              });
              pageBtn();
            }

            function nextCount2(){
              cnt++;
              informSlide();
            }
            
            function autoTimer2(){
              setId=setInterval(nextCount2,6000);
            }
            autoTimer2();

            function pageBtn(){
              $('.btn-item').removeClass('on');
              $('.btn-item').eq(cnt>7?cnt=0:cnt).addClass('on');
              $('.inform-choice').removeClass('on');
              $('.inform-choice').eq(cnt>7?cnt=0:cnt).addClass('on');
            }

            function pausefn(){
              clearInterval(setId);
              clearInterval(setId2);

              $('.viewport-stop-btn').addClass('off');
              $('.viewport-start-btn').addClass('off');

                setId2=setInterval(function(){
                  count++;  
                  if(count>6){ 
                    clearInterval(setId); 
                    clearInterval(setId2);
                    nextCount2();
                    playfn();
                  }
                },1000); 
            }
            
            function playfn(){
              autoTimer2();
              $('.viewport-start-btn').removeClass('off');
              $('.viewport-stop-btn').removeClass('off');
            }

            $('.btn-item').each(function(index){
              $(this).click(function(){
                pausefn();
                cnt=index;
                informSlide();
              });
            })

            $('.viewport-stop-btn').on({
              click:function(){
                pausefn();
              }
            });

            $('.viewport-start-btn').on({
              click:function(){
                playfn();
              }
            });


        }
      }
      slide2.init();



      //슬라이드3
      const slide3 = {
        init: function(){
            this.mainSlide();
        },
        mainSlide: function(){
            let cnt=0;

            //주제별컬렉션 슬라이드
            function swipeSlide(){
                $('.collection-swipe').stop().animate({left:-309*cnt},800,function(){
                  cnt>3?cnt=0:cnt;
                  cnt<0?cnt=3:cnt;
                  $('.collection-swipe').stop().animate({left:-309*cnt},0)
              });
            }
            function nextCount3(){   
              cnt++;
              swipeSlide();
              }
            function prevCount2(){ 
              cnt--;
              swipeSlide();
            }

            $('.swipe-next-btn').on({
              click:function(){
                nextCount3();
              }
            });

            $('.swipe-prev-btn').on({
              click:function(){
                prevCount2();
              }
            });          
        }
      }
      slide3.init();

    
    },
    section5:function(){

      // 도서
      $('.book-recommend').on({
        click:function(e){
          e.preventDefault();

          $('.book-item').removeClass('on');
          $('.book-contents').hide();
          $(this).addClass('on');
          $('#bookRecommend').show();
        }
      });
      $('.book-new').on({
        click:function(e){
          e.preventDefault();

          $('.book-item').removeClass('on');
          $('.book-contents').hide();
          $(this).addClass('on');
          $('#bookNew').show();
        }
      });
      $('.book-read').on({
        click:function(e){
          e.preventDefault();

          $('.book-item').removeClass('on');
          $('.book-contents').hide();
          $(this).addClass('on');
          $('#bookRead').show();
        }
      });
      $('.book-webdb').on({
        click:function(e){
          e.preventDefault();

          $('.book-item').removeClass('on');
          $('.book-contents').hide();
          $(this).addClass('on');
          $('#bookWebdb').show();
        }
      });

      // 도서 이미지
      $('.img-area1').on({
        mouseover:function(){
          $('.mouseover2, .mouseover3, .mouseover4, .mouseover5').hide();
          $('.mouseover1').show();

        },
        focusIn:function(){
          $('.mouseover2, .mouseover3, .mouseover4, .mouseover5').hide();
          $('.mouseover1').show();
        },
      });

      $('.img-area2').on({
        mouseover:function(){
          $('.mouseover1, .mouseover3, .mouseover4, .mouseover5').hide();
          $('.mouseover2').show();

        },
        focusIn:function(){
          $('.mouseover1, .mouseover3, .mouseover4, .mouseover5').hide();
          $('.mouseover2').show();
        },
      });

      $('.img-area3').on({
        mouseover:function(){
          $('.mouseover1, .mouseover2, .mouseover4, .mouseover5').hide();
          $('.mouseover3').show();

        },
        focusIn:function(){
          $('.mouseover1, .mouseover2, .mouseover4, .mouseover5').hide();
          $('.mouseover3').show();
        },
      });

      $('.img-area4').on({
        mouseover:function(){
          $('.mouseover1, .mouseover2, .mouseover3, .mouseover5').hide();
          $('.mouseover4').show();

        },
        focusIn:function(){
          $('.mouseover1, .mouseover2, .mouseover3, .mouseover5').hide();
          $('.mouseover4').show();
        },
      });

      $('.img-area5').on({
        mouseover:function(){
          $('.mouseover1, .mouseover2, .mouseover3, .mouseover4').hide();
          $('.mouseover5').show();

        },
        focusIn:function(){
          $('.mouseover1, .mouseover2, .mouseover3, .mouseover4').hide();
          $('.mouseover5').show();
        },
      });

      $('.img-area').on({
        mouseleave:function(){
          $('.mouseover-img').hide();
        }
      });

    },
    section6:function(){

      // 공지사항
      $('.notice1').on({
        click:function(){
          $('.notice-item').removeClass('on');
          $(this).addClass('on');
          $('#noticeTab2, #noticeTab3').hide();
          $('#noticeTab1').show();
        }
      });

      $('.notice2').on({
        click:function(){
          $('.notice-item').removeClass('on');
          $(this).addClass('on');
          $('#noticeTab1, #noticeTab3').hide();
          $('#noticeTab2').show();
        }
      });

      $('.notice3').on({
        click:function(){
          $('.notice-item').removeClass('on');
          $(this).addClass('on');
          $('#noticeTab1, #noticeTab2').hide();
          $('#noticeTab3').show();
        }
      });

      // 뉴스
      $('.news1').on({
        click:function(){
          $('.news-item').removeClass('on');
          $(this).addClass('on');
          $('#newsTab2, #newsTab3, #newsTab4').hide();
          $('#newsTab1').show();
        }
      });

      $('.news2').on({
        click:function(){
          $('.news-item').removeClass('on');
          $(this).addClass('on');
          $('#newsTab1, #newsTab3, #newsTab4').hide();
          $('#newsTab2').show();
        }
      });

      $('.news3').on({
        click:function(){
          $('.news-item').removeClass('on');
          $(this).addClass('on');
          $('#newsTab1, #newsTab2, #newsTab4').hide();
          $('#newsTab3').show();
        }
      });

      $('.news4').on({
        click:function(){
          $('.news-item').removeClass('on');
          $(this).addClass('on');
          $('#newsTab1, #newsTab2, #newsTab3').hide();
          $('#newsTab4').show();
        }
      });

    },
    section7:function(){

      let cnt=0;
      let count=0;
      let setId=null;
      let setId2=null;

      // 프로모션 슬라이드
      function promotionSlide(){
        $('.promotion-slide-wrap').stop().animate({left:-169*cnt},500,function(){
          cnt>3?cnt=0:cnt;
          cnt<0?cnt=3:cnt;
          $('.promotion-slide-wrap').stop().animate({left:-169*cnt},0)
        });
      }
      
      function nextCount(){
        cnt++;
        promotionSlide();
      }
      
      function prevCount(){
        cnt--;
        promotionSlide();
      }
      
      function autoTimer(){
        setId=setInterval(nextCount,3000);
      }
      autoTimer();

      function pausefn(){
        clearInterval(setId);
        clearInterval(setId2);

        $('.promotion-stop-btn').addClass('off');
        $('.promotion-start-btn').addClass('off');
          
          setId2=setInterval(function(){
            count++; 
            if(count>3){  
              clearInterval(setId);  
              clearInterval(setId2);  
              nextCount(); 
              playfn();     
            }
          },1000);
      }
      function playfn(){
          autoTimer();
          $('.promotion-start-btn').removeClass('off');
          $('.promotion-stop-btn').removeClass('off');
      }

      $('.promotion-prev-btn').on({
        click:function(){
          clearInterval(setId);
          if($('.promotion-slide-wrap').is(':animated')){
            return;}
          prevCount();
          pausefn();
        }
      });
      $('.promotion-next-btn').on({
        click:function(){
          clearInterval(setId);
          if($('.promotion-slide-wrap').is(':animated')){
            return;}
          nextCount();
          pausefn();
        }
      });

      $('.promotion-stop-btn').on({
        click:function(){
          pausefn();
        }
      });

      $('.promotion-start-btn').on({
        click:function(){
          playfn();
        }
      });

    },
    footer:function(){

      // 유관사이트
      $('#familySiteBtn').on({
        click:function(){
          if($('#familySite').val()!==''){
          window.open($('#familySite').val());
        }}
      });

      // 위로 바로가기 버튼

      const section4Top=$('#section4').offset().top-$(window).height(); 

      $(window).scroll(function(){

        if($(this).scrollTop()>section4Top){
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
  
  library.init();

})(jQuery);