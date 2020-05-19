#include <opencv2/opencv.hpp>
#include "httpMJPEGServer.hpp"

std::string keys =
"{ help  h      |   | Print help message. }"
"{ test  t      |   | Test videoStreamMJPEG , but open camera. }"
"{ framenet f   | 192.168.137.240 | Connect to remote target cv transporter. }"
"{ frameport fp | 10089 | Connect to remote target cv transporter port , must using with 'framenet' or '-f'. }";

int main(int argc, char* argv[])
{
	cv::CommandLineParser parser(argc, argv, keys);
	if (argc == 1 || parser.has("help"))
	{
		parser.printMessage();
		return 0;
	}else if (parser.has("test"))
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
	else if (parser.has("framenet"))
	{
		if (parser.has("frameport"))
		{
			const std::string RemoteIPTarget = parser.get<std::string>("framenet");
			const int RemoteIPPort = parser.get<int>("frameport");
			std::cout << "DEBUG:network " << RemoteIPTarget << ":" << RemoteIPPort << std::endl;
		}
		else 
		{
			std::cout << "error!: -f and -fp both must use." << std::endl;
		}
	}
}
