#include <ctype.h>
#include <pwd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

#define MAX_CMD_SIZE 100
#define MAX_ARGS_SIZE 100
#define MAX_PATH_LENGTH 100
#define MAX_HOSTNAME_LENGTH 100

struct command {
  const char **argv;
};

int numberOfTotalCommands = 0;
char *cmdHistory[MAX_CMD_SIZE];

void promptCommand(void);
void formatCurrentDirectory(char *currentDirectory);
void formatCurrentHostname(char *currentHostname);

int parseCommand(char *cmdInput, struct command cmds[],
                 int *numberOfCurrCommands);
int parseCommands(char *cmdInputs);
void saveCommand(char *cmd);

void executeCommands(char cmdsInput[]);
void executeCommandBasedOnType(int commandType, int *numberOfCurrCommands,
                               struct command *cmds);

void executeCommand(int in, int out, struct command *cmd);
void executePipedCommand(int n, struct command *cmd);
void executeChainedCommands(int n, struct command *cmds);

int main(int argc, char **argv) {
  char cmdsInput[MAX_CMD_SIZE];

  // promptCommand();
  if (argc < 2) {
    return 1;
  }

  strcpy(cmdsInput, argv[1]);
  // saveCommand(cmdsInput);
  executeCommands(cmdsInput);
}

void promptCommand() {
  char currentDirectory[MAX_PATH_LENGTH];
  char currentHostname[MAX_HOSTNAME_LENGTH];

  struct passwd *p = getpwuid(getuid());

  if (getcwd(currentDirectory, MAX_PATH_LENGTH) != NULL && p != NULL &&
      gethostname(currentHostname, MAX_HOSTNAME_LENGTH) == 0) {
    formatCurrentDirectory(currentDirectory);
    formatCurrentHostname(currentHostname);
    printf("%s@%s %s $ ", p->pw_name, currentHostname, currentDirectory);

  } else {
    printf("%% ");
  }
}

void formatCurrentDirectory(char *currentDirectory) {
  char *lastSlash = strrchr(currentDirectory, '/');
  if (lastSlash != NULL) {
    char *_cd = lastSlash + 1;
    strcpy(currentDirectory, _cd);
  }
}

void formatCurrentHostname(char *currentHostname) {
  char *dot = strrchr(currentHostname, '.');
  if (dot != NULL) {
    char _currHostname[MAX_HOSTNAME_LENGTH];
    int dotIndex = dot - currentHostname;
    strncpy(_currHostname, currentHostname, dotIndex);
    _currHostname[dotIndex] = '\0';
    strcpy(currentHostname, _currHostname);
  }
}

void saveCommand(char *cmd) {
  if (strstr(cmd, "history") != NULL) {
    return;
  }
  char *_cmd = malloc(strlen(cmd) + 1);
  strcpy(_cmd, cmd);
  cmdHistory[numberOfTotalCommands] = _cmd;
  (numberOfTotalCommands)++;
}

void executeCommands(char cmdsInput[]) {
  char *separatedCmdsInput[MAX_CMD_SIZE];
  int j = 0;
  int lastAmper = 0;
  for (int i = 1; cmdsInput[i - 1]; i++) {
    if (cmdsInput[i - 1] == '&' && cmdsInput[i] == '&') {
      char *singleCmdInput = (char *)malloc(MAX_CMD_SIZE);
      strncpy(singleCmdInput, cmdsInput + lastAmper, i - 1 - lastAmper);
      separatedCmdsInput[j++] = singleCmdInput;
      lastAmper = i + 2;
    }
  }

  char singleCmdInput[MAX_CMD_SIZE];
  strncpy(singleCmdInput, cmdsInput + lastAmper, MAX_CMD_SIZE);
  separatedCmdsInput[j++] = singleCmdInput;

  for (int i = 0; i < j; i++) {
    struct command cmds[MAX_CMD_SIZE];
    int numberOfCurrCommands = 0;
    char *singleCmdInput = separatedCmdsInput[i];
    int commandType = parseCommand(singleCmdInput, cmds, &numberOfCurrCommands);
    executeCommandBasedOnType(commandType, &numberOfCurrCommands, cmds);
  }
}

int parseCommand(char *cmdInput, struct command cmds[],
                 int *numberOfCurrCommands) {
  int numberOfPipes = 0;

  for (int i = 1; cmdInput[i - 1]; i++) {
    if (cmdInput[i - 1] == '|') {
      numberOfPipes++;
    }

    cmdInput[i - 1] = tolower(cmdInput[i - 1]);
  }

  for (int i = strlen(cmdInput) - 1; i >= 0; i--) {
    if (isspace(cmdInput[i])) {
      cmdInput[i] = '\0';
    } else {
      break;
    }
  }

  char *_args = strtok(cmdInput, " ");

  for (int i = 0; i <= numberOfPipes; i++) {
    struct command newCmd;
    char **args = malloc(MAX_ARGS_SIZE);
    int j = 0;
    while (_args != NULL) {
      if (*_args != '|') {
        args[j++] = _args;
      }

      _args = strtok(NULL, " ");
      if (_args != NULL && *_args == '|') {
        break;
      }
    }
    args[j] = NULL;
    newCmd.argv = (char const **)args;
    cmds[*numberOfCurrCommands] = newCmd;
    (*numberOfCurrCommands)++;
  }

  if (strcmp(cmdInput, "exit") == 0) {
    return 2;
  }

  if (strcmp(cmdInput, "history") == 0) {
    return 3;
  }

  if (strcmp(cmdInput, "cd") == 0) {
    return 4;
  }

  if (numberOfPipes > 0) {
    return 5;
  }

  return 0;
}

void executeCommandBasedOnType(int commandType, int *numberOfCurrCommands,
                               struct command *cmds) {
  switch (commandType) {
    case 2:  // exit
      printf("Terminal Closed\n");
      exit(0);
      break;
    case 3:  // history
      for (int i = 0; i < numberOfTotalCommands; i++) {
        printf("%d: %s", i, cmdHistory[i]);
      }
      break;
    case 4:  // cd
      if (chdir(cmds[0].argv[1]) != 0) {
        perror("CD Error: ");
      }
      break;
    case (5):  // piped command (eg: ps aux | wc -l)
      executePipedCommand(*numberOfCurrCommands, cmds);
      break;
    default:  // basic command (eg: ls)
      executeCommand(0, 1, cmds);
      break;
  }
}

void executeCommand(int in, int out, struct command *cmds) {
  pid_t pid, wpid;
  int status = 0;
  pid = fork();

  if (pid == 0) {
    if (in != 0) {
      dup2(in, 0);
      close(in);
    }

    if (out != 1) {
      dup2(out, 1);
      close(out);
    }

    execvp(cmds->argv[0], (char *const *)cmds->argv);
    exit(0);
  }

  if (pid > 0) {
    if (out == 1) {
      while (wait(&status) > 0)
        ;
    }
  }
}

void executePipedCommand(int n, struct command *cmds) {
  int i, in, fd[2];

  int _stdin = dup(0);
  int _stdout = dup(1);
  in = 0;

  for (i = 0; i < n - 1; i++) {
    pipe(fd);

    executeCommand(in, fd[1], cmds + i);

    close(fd[1]);

    in = fd[0];
  }

  dup2(_stdout, 1);
  close(_stdout);

  executeCommand(in, 1, cmds + i);

  dup2(_stdin, 0);
  close(_stdin);
}
