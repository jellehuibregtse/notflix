import { BadRequestException, Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Controller('video')
export class StreamingController {
  @Get()
  streamVideo(@Req() request: Request, @Res() response: Response) {
    const range = request.headers.range;

    if (!range) {
      throw new BadRequestException('Range header is required');
    }

    const videoPath = process.env.VIDEO_PATH || '/usr/src/app/assets/video.mp4';
    const videoSize = fs.statSync(videoPath).size;

    // Parse range (example: 'bytes=start-')
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ''));
    // Make sure we do not exceed the video file size.
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };

    response.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(response);
  }
}
