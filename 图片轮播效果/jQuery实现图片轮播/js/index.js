window.onload = function () {

$(".imageRotation").each(function(){
		// 获取有关参数
		var imageRotation = this,
				imageBox = $(imageRotation).children(".imageBox")[0],
				titleBox = $(imageRotation).children(".titleBox")[0],
				titleArr = $(titleBox).children(),
				icoBox = $(imageRotation).children(".icoBox")[0],
				icoArr = $(icoBox).children(),
				imageWidth = $(imageRotation).width(),
				imageNum = $(imageBox).children().size(),  // 图片数量
				imageReelWidth = imageWidth*imageNum,  // 图片容器宽度
				activeID = parseInt($($(icoBox).children(".active")[0]).attr("rel")),  // 当前图片ID
				nextID = 0,  // 下张图片ID
				setIntervalID,  // setInterval() 函数ID
				intervalTime = 3000,  // 间隔时间
				imageSpeed =400,  // 图片动画执行速度
				titleSpeed =250;  // 标题动画执行速度
		// 设置 图片容器 的宽度
		$(imageBox).css({'width' : imageReelWidth + "px"});
		// 图片轮换函数
		var rotate=function(clickID){
			if(clickID){ nextID = clickID; }
			else{ nextID=activeID<=4 ? activeID+1 : 1; }
			// 交换图标
			$(icoArr[activeID-1]).removeClass("active");
			$(icoArr[nextID-1]).addClass("active");
			// 交换标题
			$(titleArr[activeID-1]).animate({bottom:"-40px"}, titleSpeed, function(){
						$(titleArr[nextID-1]).animate({bottom:"0px"} , titleSpeed);
					}
			);
			// 交换图片
			$(imageBox).animate({left:"-"+(nextID-1)*imageWidth+"px"} , imageSpeed);
			// 交换ID
			activeID = nextID;
		}
		setIntervalID=setInterval(rotate,intervalTime);
		$(imageBox).hover(
				function(){ clearInterval(setIntervalID); },
				function(){ setIntervalID=setInterval(rotate,intervalTime); }
		);
		$(icoArr).click(function(){
			clearInterval(setIntervalID);
			var clickID = parseInt($(this).attr("rel"));
			rotate(clickID);
			setIntervalID=setInterval(rotate,intervalTime);
		});
	});

}