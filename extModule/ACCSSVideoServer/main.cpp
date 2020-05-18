#include <opencv2/opencv.hpp>
#include "httpMJPEGServer.hpp"
int main()
{
	bool connected;
	cv::Mat MatBuffer;
	std::vector<uchar> buf;
	HttpMJPEGServer test("10089");
	while (true)
	{
		test.HttpStartIncomming();
		cv::VideoCapture cap(0);
		std::cout << "conection reset" << std::endl;
		connected = true;
		while (connected)
		{
			cap >> MatBuffer;
			std::vector<uchar> buf;
			cv::imencode(".jpg", MatBuffer, buf, std::vector<int>());
			std::string content(buf.begin(), buf.end());
		 	connected = test.HttpMJPEGSender(content);
			if (!connected)
			{
				cap.~VideoCapture();
			}
		}
	}  
}
